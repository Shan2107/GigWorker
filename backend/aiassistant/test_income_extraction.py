import os
import json
from openai_service import GigWorkerAIService
from openai import AuthenticationError


def run_income_tests():
    try:
        ai_service = GigWorkerAIService()
    except AuthenticationError as e:
        print(f"Authentication Error: {e}")
        print("Please make sure your OPENAI_API_KEY is set correctly in the .env file.")
        return
    

    # Test income extraction
    income_image_path = "dummy_income.jpg"
    print("\n=== INCOME EXTRACTION TEST ===")
    if not os.path.exists(income_image_path):
        print(f"Test file {income_image_path} not found. Skipping income test.")
    else:
        print(f"--- Testing with: {income_image_path} ---")
        try:
            income_result = ai_service.extract_income_data(income_image_path)
            print(json.dumps(income_result, indent=2))
            assert income_result is not None
            assert "total_income" in income_result
            assert "payout_amount" in income_result
            print("Income extraction test PASSED.")
        except Exception as e:
            print(f"Income extraction test FAILED: {e}")

if __name__ == "__main__":
    run_income_tests()