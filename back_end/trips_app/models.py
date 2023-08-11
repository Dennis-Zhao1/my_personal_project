from django.db import models
from plans_app.models import Plans
from django.utils import timezone

# Create your models here.
class Trips(models.Model):
    name = models.TextField(default="Unknown")
    start_day = models.DateField(default=timezone.now().date() + timezone.timedelta(days=1))
    end_day = models.DateField(null=True)
    plans = models.ForeignKey(Plans,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name 
