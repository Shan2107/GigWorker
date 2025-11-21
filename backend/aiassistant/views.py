from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
import json

from .models import (
    ContractPDFStream, ContractTextStream, 
    AIChatStream, IncomeImageStream, ExpenseImageStream
)
from .utils import (
    extract_pdf_text, analyze_text_with_ai,
    extract_image_text, analyze_income_or_expense
)

User = get_user_model()


# -----------------------------
# 1. Upload Contract PDF
# -----------------------------
@csrf_exempt
def upload_contract_pdf(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    user = request.user
    file = request.FILES.get("file")

    if not file:
        return JsonResponse({"error": "PDF file required"}, status=400)

    pdf_stream = ContractPDFStream.objects.create(user=user, file=file)

    extracted = extract_pdf_text(file)
    pdf_stream.extracted_text = extracted

    analysis, severity = analyze_text_with_ai(extracted)
    pdf_stream.ai_analysis = analysis
    pdf_stream.severity = severity
    pdf_stream.save()

    return JsonResponse({
        "message": "Contract PDF processed",
        "extracted_text": extracted,
        "analysis": analysis,
        "severity": severity,
    })
    

# -----------------------------
# 2. Submit Contract Text
# -----------------------------
@csrf_exempt
def submit_contract_text(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body.decode("utf-8"))
    text = data.get("text")

    if not text:
        return JsonResponse({"error": "Text required"}, status=400)

    user = request.user
    text_stream = ContractTextStream.objects.create(user=user, text=text)

    analysis, severity = analyze_text_with_ai(text)
    text_stream.ai_analysis = analysis
    text_stream.severity = severity
    text_stream.save()

    return JsonResponse({
        "message": "Contract text analyzed",
        "analysis": analysis,
        "severity": severity,
    })


# -----------------------------
# 3. AI Chat
# -----------------------------
@csrf_exempt
def ai_chat(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body.decode("utf-8"))
    user_message = data.get("message")

    if not user_message:
        return JsonResponse({"error": "Message required"}, status=400)

    ai_response = analyze_text_with_ai(user_message)[0]   # returns (analysis, severity)

    chat = AIChatStream.objects.create(
        user=request.user,
        user_message=user_message,
        ai_response=ai_response
    )

    return JsonResponse({
        "response": ai_response
    })


# -----------------------------
# 4. Income Image Upload
# -----------------------------
@csrf_exempt
def upload_income_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    image = request.FILES.get("image")

    if not image:
        return JsonResponse({"error": "Image required"}, status=400)

    stream = IncomeImageStream.objects.create(user=request.user, image=image)

    extracted = extract_image_text(image)
    stream.extracted_text = extracted

    ai_analysis, amount = analyze_income_or_expense(extracted)
    stream.ai_analysis = ai_analysis
    stream.amount_detected = amount
    stream.save()

    return JsonResponse({
        "message": "Income image processed",
        "extracted_text": extracted,
        "analysis": ai_analysis,
        "amount_detected": str(amount)
    })


# -----------------------------
# 5. Expense Image Upload
# -----------------------------
@csrf_exempt
def upload_expense_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    image = request.FILES.get("image")

    if not image:
        return JsonResponse({"error": "Image required"}, status=400)

    stream = ExpenseImageStream.objects.create(user=request.user, image=image)

    extracted = extract_image_text(image)
    stream.extracted_text = extracted

    ai_analysis, amount = analyze_income_or_expense(extracted)
    stream.ai_analysis = ai_analysis
    stream.amount_detected = amount
    stream.save()

    return JsonResponse({
        "message": "Expense image processed",
        "extracted_text": extracted,
        "analysis": ai_analysis,
        "amount_detected": str(amount)
    })
