from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from aiassistant.openai_service import GigWorkerAIService
import tempfile
import os

ai_service = GigWorkerAIService()

class FinancialChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_message = request.data.get('message')
        if not user_message:
            return Response({"error": "Message not provided"}, status=400)
        
        reply = ai_service.financial_chat(user_message)
        return Response({"reply": reply})

class ContractAnalyzerView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return Response({"error": "No file uploaded"}, status=400)

        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_file.name)[1]) as temp_file:
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)
            temp_file_path = temp_file.name

        try:
            analysis_result = ai_service.analyze_contract(temp_file_path)
            return Response({"analysis": analysis_result})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        finally:
            os.remove(temp_file_path) # Clean up the temporary file

class ExpenseVisionView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_image = request.FILES.get('image')
        if not uploaded_image:
            return Response({"error": "No image uploaded"}, status=400)

        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_image.name)[1]) as temp_image:
            for chunk in uploaded_image.chunks():
                temp_image.write(chunk)
            temp_image_path = temp_image.name

        try:
            extracted_data = ai_service.extract_expense_data(temp_image_path)
            return Response({"data": extracted_data})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        finally:
            os.remove(temp_image_path) # Clean up the temporary file

class IncomeVisionView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_image = request.FILES.get('image')
        if not uploaded_image:
            return Response({"error": "No image uploaded"}, status=400)

        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_image.name)[1]) as temp_image:
            for chunk in uploaded_image.chunks():
                temp_image.write(chunk)
            temp_image_path = temp_image.name

        try:
            extracted_data = ai_service.extract_income_data(temp_image_path)
            return Response({"data": extracted_data})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        finally:
            os.remove(temp_image_path) # Clean up the temporary file

class CategorizeExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        description = request.data.get('description')
        amount = request.data.get('amount')
        context = request.data.get('context')

        if not all([description, amount]):
            return Response({"error": "Description and amount are required"}, status=400)
        
        try:
            amount = float(amount)
        except ValueError:
            return Response({"error": "Amount must be a valid number"}, status=400)

        categorization_result = ai_service.categorize_expense(description, amount, context)
        return Response({"categorization": categorization_result})

class TaxEstimationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        monthly_income = request.data.get('monthly_income')
        expenses = request.data.get('expenses')
        gig_type = request.data.get('gig_type')

        if not all([monthly_income, expenses, gig_type]):
            return Response({"error": "Monthly income, expenses, and gig type are required"}, status=400)
        
        try:
            monthly_income = float(monthly_income)
            expenses = float(expenses)
        except ValueError:
            return Response({"error": "Monthly income and expenses must be valid numbers"}, status=400)

        estimation_result = ai_service.tax_estimation(monthly_income, expenses, gig_type)
        return Response({"estimation": estimation_result})