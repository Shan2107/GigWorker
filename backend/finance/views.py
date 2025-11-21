from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Account, Transaction, TaxReport
from .serializers import AccountSerializer, TransactionSerializer, TaxReportSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaxReportViewSet(viewsets.ModelViewSet):
    queryset = TaxReport.objects.all()
    serializer_class = TaxReportSerializer
    permission_classes = [permissions.IsAuthenticated]