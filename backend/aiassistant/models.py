# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# ------------------------------
# 1. PDF Data Stream (Contracts)
# ------------------------------
class ContractPDFStream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to="contracts/")
    extracted_text = models.TextField(blank=True, null=True)
    ai_analysis = models.TextField(blank=True, null=True)
    severity = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contract PDF ({self.id}) by {self.user}"


# ------------------------------------------
# 2. Contract Text Stream (Already extracted)
# ------------------------------------------
class ContractTextStream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    ai_analysis = models.TextField(blank=True, null=True)
    severity = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contract Text Stream ({self.id})"


# -----------------------------------------------------
# 3. AI Assistant Chat / Messages (Text Data Stream)
# -----------------------------------------------------
class AIChatStream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_message = models.TextField()
    ai_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat Msg {self.id} by {self.user}"


# ------------------------------------------
# 4. Image Data Stream (Income Analyzer)
# ------------------------------------------
class IncomeImageStream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="income_images/")
    extracted_text = models.TextField(blank=True, null=True)
    ai_analysis = models.TextField(blank=True, null=True)
    amount_detected = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Income Image ({self.id})"


# -------------------------------------------
# 5. Image Data Stream (Expense Analyzer)
# -------------------------------------------
class ExpenseImageStream(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="expense_images/")
    extracted_text = models.TextField(blank=True, null=True)
    ai_analysis = models.TextField(blank=True, null=True)
    amount_detected = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Expense Image ({self.id})"
