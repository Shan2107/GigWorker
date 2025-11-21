from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "Registration successful.",
                    "user": {
                        "id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "role": user.profile.role,
                        "occupation": user.profile.occupation,
                        "age": user.profile.age,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []  # no auth/CSRF check for this simple login endpoint

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]

            # Optionally create a session (if you want server-side sessions)
            login(request, user)

            # Return basic user info to the frontend
            return Response(
                {
                    "message": "Login successful.",
                    "user": {
                        "id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "role": user.profile.role,
                        "occupation": user.profile.occupation,
                        "age": user.profile.age,
                    },
                },
                status=status.HTTP_200_OK,
            )

        # serializer.errors will contain {"non_field_errors": ["Invalid email or password. Please try again."]}
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)