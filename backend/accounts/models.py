from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = [
        ("artist", "Artist"),
        ("content_creator", "Content Creator"),
        ("small_business", "Small Business"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    occupation = models.CharField(max_length=255)
    age = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.role}"