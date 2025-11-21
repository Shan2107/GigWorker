import base64
import json
import os
import fitz 
from openai import OpenAI
from config import OpenAIConfig
from prompts import (
    CHATBOT_SYSTEM_PROMPT, 

    CONTRACT_ANALYZER_PROMPT, 

    EXPENSE_VISION_PROMPT, 

    INCOME_VISION_PROMPT
)
from io import BytesIO

class GigWorkerAIService:
    def __init__(self):
        self.client = OpenAI(api_key=OpenAIConfig.API_KEY)
        self.config = OpenAIConfig
    

    def _extract_text_from_pdf(self, file_path):
        """Extract text from a PDF file."""
        try:
            doc = fitz.open(file_path)
            text = ""
            for page in doc:
                text += page.get_text()
            return text
        except Exception as e:
            return f"Error extracting text from PDF: {e}"



    def analyze_contract(self, file_path):
        """
        Analyzes a contract from a text or PDF file.
        """
        content = ""
        if file_path.lower().endswith('.pdf'):
            content = self._extract_text_from_pdf(file_path)
        elif file_path.lower().endswith('.txt'):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        else:
            return "Unsupported file type. Please provide a .txt or .pdf file."

        if "Error" in content:
            return content

        response = self.client.chat.completions.create(
            model=self.config.CHAT_MODEL,
            messages=[
                {"role": "system", "content": CONTRACT_ANALYZER_PROMPT},
                {"role": "user", "content": f"Please analyze the following contract:\n\n{content}"}
            ],
            temperature=self.config.TEMPERATURE,
            max_tokens=2000  # Increased tokens for detailed contract analysis
        )

        return response.choices[0].message.content

    def encode_image(self, image_path):
        """Encode image to base64 for vision API"""
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    def financial_chat(self, user_message):
        """
        Handle financial chatbot using chat.completions.create() method
        """
        response = self.client.chat.completions.create(
            model=self.config.CHAT_MODEL,
            messages=[
                {"role": "system", "content": CHATBOT_SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=self.config.TEMPERATURE,
            max_tokens=self.config.MAX_TOKENS
        )
        return response.choices[0].message.content



    def _extract_data_from_image(self, file_path, prompt):
        """
        Private helper to extract data from an image using a specific prompt.
        """
        try:
            base64_image = self.encode_image(file_path)
        except FileNotFoundError:
            return {"error": "File not found", "file_path": file_path}
        except Exception as e:
            return {"error": f"Failed to encode image: {e}"}

        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
                    }
                ]
            }
        ]

        response = self.client.chat.completions.create(
            model=self.config.VISION_MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.1,
            max_tokens=1500
        )

        try:
            content = response.choices[0].message.content
            extracted_data = json.loads(content)
            return extracted_data
        except (json.JSONDecodeError, KeyError) as e:
            return {"error": "Failed to parse extraction results", "raw_output": response.choices[0].message.content, "parsing_error": str(e)}



    def extract_expense_data(self, file_path):
        """
        Extracts expense data from an image file using the vision model.
        """
        return self._extract_data_from_image(file_path, EXPENSE_VISION_PROMPT)


    def extract_income_data(self, file_path):
        """
        Extracts income data from an image file using the vision model.
        """
        return self._extract_data_from_image(file_path, INCOME_VISION_PROMPT)



    def categorize_expense(self, description, amount, context=None):
        """
        Categorize expense using chat.completions method
        """
        categorization_prompt = f"""
        Categorize this expense for SARS tax purposes and return ONLY JSON:
        Expense Description: {description}
        Amount: R{amount}
        Context: {context or 'General business expense'}

        

        Required JSON format:
        {{
            "category": "travel/equipment/supplies/communication/home_office/etc",
            "tax_deductible": true/false,
            "sars_category": "specific SARS deduction category",
            "confidence": 0.0-1.0,
            "notes": "brief explanation"
        }}
        """
        response = self.client.chat.completions.create(
            model=self.config.CHAT_MODEL,
            messages=[
                {"role": "system", "content": CHATBOT_SYSTEM_PROMPT},
                {"role": "user", "content": categorization_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.1,
            max_tokens=500
        )
        try:
            return json.loads(response.choices[0].message.content)
        except json.JSONDecodeError:
            return response.choices[0].message.content

    def tax_estimation(self, monthly_income, expenses, gig_type):
        """
        Estimate tax liability for South African gig workers
        """
        tax_prompt = f"""
        Calculate provisional tax estimate for:
        Monthly Income: R{monthly_income}
        Monthly Expenses: R{expenses}
        Gig Type: {gig_type}

        

        Return JSON format:
        {{
            "taxable_income": "annual amount",
            "provisional_tax_estimate": "amount",
            "monthly_tax_savings_target": "amount",
            "deductions_applied": ["list of applicable deductions"],
            "deadlines": ["relevant SARS deadlines"],
            "notes": "calculation explanation"
        }}
        """

        

        response = self.client.chat.completions.create(
            model=self.config.CHAT_MODEL,
            messages=[
                {"role": "system", "content": CHATBOT_SYSTEM_PROMPT},
                {"role": "user", "content": tax_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.1,
        )
        try:
            return json.loads(response.choices[0].message.content)
        except json.JSONDecodeError:
            return response.choices[0].message.content