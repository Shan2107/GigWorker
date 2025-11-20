from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .utils import categorize_text, chat_with_ai


class CategorizeAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def post(self, request):
        text = request.data.get('text','')
        result = categorize_text(text)
        return Response({'result': result})


class ChatAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def post(self, request):
        message = request.data.get('message','')
        reply = chat_with_ai(message)
        return Response({'reply': reply})