from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, TransactionViewSet, TaxReportViewSet


router = DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'taxreports', TaxReportViewSet)


urlpatterns = [
    path('', include(router.urls)),
]