import os
import json
from openai_service import GigWorkerAIService
from openai import AuthenticationError

def test_vision_extraction():
    try:
        ai_service = GigWorkerAIService()
    except AuthenticationError as e:
        print(f"Authentication Error: {e}")
        print("Please make sure your OPENAI_API_KEY is set correctly in the .env file.")
        return

    image_path = "image.png"
    
    print("=== VISION EXTRACTION TEST ===")
    
    # Test with image
    print("\n--- Testing with Image File ---")
    try:
        image_result = ai_service.extract_financial_data(image_path, user_context="Extract details from this receipt.")
        print(json.dumps(image_result, indent=2))
    except Exception as e:
        print(f"Image test failed as expected: {e}")

if __name__ == "__main__":
    test_vision_extraction()