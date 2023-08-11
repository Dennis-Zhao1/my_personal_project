from django.db import models
from django.utils import timezone
from day_detail_app.models import Day_detail

# Create your models here.
class Time_detail(models.Model):
    time = models.TimeField()
    description = models.TextField(default="Unknown")
    day = models.ForeignKey(Day_detail, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.day} {self.time}" 