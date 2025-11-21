from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import RegisterSerializer

User = get_user_model()  # This will reference your custom users.User model
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer   