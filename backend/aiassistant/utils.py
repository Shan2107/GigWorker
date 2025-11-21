import re

def extract_pdf_text(file):
    """
    TODO: Replace this with PyPDF2, pypdf, pdfplumber, or AI extraction.
    """
    return "Extracted text from PDF (mock)"


def analyze_text_with_ai(text):
    """
    TODO: Replace this with your LLM or OpenAI API call.
    """
    severity = "LOW"

    if "terminate" in text.lower():
        severity = "HIGH"

    analysis = f"AI analysis of text: {text[:150]}..."
    return analysis, severity


def extract_image_text(image):
    """
    TODO: Use Tesseract, EasyOCR, or an AI Vision model.
    """
    return "Detected text from image (mock)"


def analyze_income_or_expense(text):
    """
    Extract amount using regex and return simple AI explanation.
    """
    amount = None
    match = re.search(r"(\d+[.,]?\d+)", text)
    if match:
        amount_str = match.group(1).replace(",", "")
        amount = float(amount_str)

    ai_analysis = f"AI analyzed financial record. Amount detected: {amount}"
    return ai_analysis, amount
