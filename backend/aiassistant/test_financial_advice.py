from openai_service import GigWorkerAIService

def test_basic_advice():
    ai_service = GigWorkerAIService()
    
    print("=== FINANCIAL ADVICE TEST ===")
    
    # Test 1: Tax Deduction Question
    response1 = ai_service.financial_chat(
        "Can I deduct my vehicle maintenance costs as an Uber driver?"
    )
    print("Q: Can I deduct vehicle maintenance as an Uber driver?")
    print(f"A: {response1}\n")
    
    # Test 2: Provisional Tax Question
    response2 = ai_service.financial_chat(
        "When are provisional tax returns due for someone earning R25,000 per month?"
    )
    print("Q: When are provisional tax returns due for R25,000/month?")
    print(f"A: {response2}\n")

# Run the test
if __name__ == "__main__":
    test_basic_advice()