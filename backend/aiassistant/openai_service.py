
import base64
import json
import os
from openai import OpenAI
from config import OpenAIConfig
from prompts import CHATBOT_SYSTEM_PROMPT, VISION_SYSTEM_PROMPT

from io import BytesIO

class GigWorkerAIService:
    def __init__(self):
        self.client = OpenAI(api_key=OpenAIConfig.API_KEY)
        self.config = OpenAIConfig
    
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

    def extract_financial_data(self, file_path, user_context=None):
        """
        Extract financial data from images or PDFs using vision capabilities.
        """
        base64_images = []
        base64_images.append(self.encode_image(file_path))

        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"{VISION_SYSTEM_PROMPT}\n\nUser Context: {user_context or 'General business expense'}\n\nReturn ONLY valid JSON format as specified."
                    }
                ]
            }
        ]

        for base64_image in base64_images:
            messages[0]["content"].append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            })

        response = self.client.chat.completions.create(
            model=self.config.VISION_MODEL,
            messages=messages,
            temperature=0.1,
            max_tokens=1500
        )

        try:
            # The response content is a string, which might be a JSON object.
            content = response.choices[0].message.content
            # It's common for the model to wrap the JSON in markdown
            if content.startswith("```json"):
                content = content[7:-4]
            extracted_data = json.loads(content)
            return extracted_data
        except (json.JSONDecodeError, KeyError) as e:
            return {"error": "Failed to parse extraction results", "raw_output": response.choices[0].message.content, "parsing_error": str(e)}

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