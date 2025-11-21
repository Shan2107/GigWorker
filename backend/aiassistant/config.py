import os
from dotenv import load_dotenv

load_dotenv()

class OpenAIConfig:
    API_KEY = os.getenv("OPENAI_API_KEY")
    CHAT_MODEL = "gpt-4"
    VISION_MODEL = "gpt-4o"
    MAX_TOKENS = 1000
    TEMPERATURE = 0.1