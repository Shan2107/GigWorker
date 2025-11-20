from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    role = serializers.ChoiceField(choices=Profile.ROLE_CHOICES)
    occupation = serializers.CharField(max_length=255)
    age = serializers.IntegerField(min_value=16, max_value=120)  # adjust as needed
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        # Remove confirm_password; we only store password
        validated_data.pop("confirm_password")

        first_name = validated_data.pop("first_name")
        last_name = validated_data.pop("last_name")
        role = validated_data.pop("role")
        occupation = validated_data.pop("occupation")
        age = validated_data.pop("age")
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        # Create the User (use email as username internally)
        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )

        # Create the Profile
        Profile.objects.create(
            user=user,
            role=role,
            occupation=occupation,
            age=age,
        )

        return user