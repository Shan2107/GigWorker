import os
import json
from openai_service import GigWorkerAIService
from openai import AuthenticationError

def run_expense_tests():
    try:
        ai_service = GigWorkerAIService()
    except AuthenticationError as e:
        print(f"Authentication Error: {e}")
        print("Please make sure your OPENAI_API_KEY is set correctly in the .env file.")
        return

    # Test expense extraction
    expense_image_path = "image.png"
    print("\n=== EXPENSE EXTRACTION TEST ===")
    if not os.path.exists(expense_image_path):
        print(f"Test file {expense_image_path} not found. Skipping expense test.")
    else:
        print(f"--- Testing with: {expense_image_path} ---")
        try:
            expense_result = ai_service.extract_expense_data(expense_image_path)
            print(json.dumps(expense_result, indent=2))
            assert expense_result is not None
            assert "error" not in expense_result
            # assert expense_result["error"] == "The document is not a valid expense document."
            print("Expense extraction test PASSED (as expected for placeholder).")
        except Exception as e:
            print(f"Expense extraction test FAILED: {e}")

if __name__ == "__main__":
    run_expense_tests()