from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Incident
from .serializers import IncidentSerializer


class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all().order_by('-created_at')
    serializer_class = IncidentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


def perform_create(self, serializer):
    instance = serializer.save(user=self.request.user)
# AI categorization can be added here