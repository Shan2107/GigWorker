import os
import openai


openai.api_key = os.getenv('OPENAI_KEY')


def categorize_text(text: str) -> str:
prompt = f"Classify this incident description and return severity: {text}"
resp = openai.ChatCompletion.create(
model='gpt-4o-mini',
messages=[
{'role':'system','content':'You are a safety classifier.'},
{'role':'user','content':prompt}
],
max_tokens=200
)
return resp.choices[0].message['content']


def chat_with_ai(user_message: str, history: list = None) -> str:
messages = [{'role':'system','content':'You are a helpful public-safety assistant.'}]
if history:
messages.extend(history)
messages.append({'role':'user','content':user_message})
resp = openai.ChatCompletion.create(
model='gpt-4o-mini',
messages=messages
)
return resp.choices[0].message['content']