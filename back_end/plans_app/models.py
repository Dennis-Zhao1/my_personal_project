from django.db import models
from user_app.models import User

# Create your models here.
class Plans(models.Model):
    name = models.CharField(max_length=255,default="Unknown")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user.last_name}' travel plans: {self.name}"

    
    