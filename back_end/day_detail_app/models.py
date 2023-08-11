from django.db import models
from django.utils import timezone
from trips_app.models import Trips
from django.core import validators as v

# Create your models here.
class Day_detail(models.Model):
    day = models.IntegerField(validators=[v.MinValueValidator(1), v.MaxValueValidator(100)])
    trip = models.ForeignKey(Trips,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Day {self.day}" 