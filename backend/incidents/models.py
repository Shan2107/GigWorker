from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings


class Incident(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True)
    severity = models.CharField(max_length=50, blank=True)
    ai_advice = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


def __str__(self):
    return self.title