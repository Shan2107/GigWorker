import os
from openai_service import GigWorkerAIService

def test_contract_analysis():
    """
    Tests the contract analysis feature with a dummy contract.
    """
    # Setup
    service = GigWorkerAIService()
    contract_file = "Nkosikhona Mlaba Book Quotation.pdf"

    # Pre-condition check
    if not os.path.exists(contract_file):
        print(f"Test file {contract_file} not found. Skipping test.")
        return

    print(f"--- Analyzing contract: {contract_file} ---")

    # Action
    analysis_result = service.analyze_contract(contract_file)

    # Output
    print("\n--- AI Contract Analysis Result ---")
    print(analysis_result)
    print("\n--- End of Analysis ---")

    # Assertion
    assert analysis_result is not None
    assert "Red Flags" in analysis_result
    assert "Favorable Terms" in analysis_result

if __name__ == "__main__":
    # Ensure you have a .env file with your OPENAI_API_KEY
    if not os.getenv("OPENAI_API_KEY"):
        print("OPENAI_API_KEY environment variable not found. Please create a .env file.")
    else:
        test_contract_analysis()
