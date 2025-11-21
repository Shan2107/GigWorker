from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from backend.api_views import (
    FinancialChatView,
    ContractAnalyzerView,
    ExpenseVisionView,
    IncomeVisionView,
    CategorizeExpenseView,
    TaxEstimationView,
)

def home(request):
    return HttpResponse("GigWorker backend is running")

urlpatterns = [
    path("", home),  # root URL
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/ai/chat/", FinancialChatView.as_view(), name='financial-chat'),
    path("api/ai/contract-analyze/", ContractAnalyzerView.as_view(), name='contract-analyze'),
    path("api/ai/expense-extract/", ExpenseVisionView.as_view(), name='expense-extract'),
    path("api/ai/income-extract/", IncomeVisionView.as_view(), name='income-extract'),
    path("api/ai/expense-categorize/", CategorizeExpenseView.as_view(), name='expense-categorize'),
    path("api/ai/tax-estimate/", TaxEstimationView.as_view(), name='tax-estimate'),
]