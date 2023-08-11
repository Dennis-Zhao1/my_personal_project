from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True,blank=False,null=False)
    phone_number = PhoneNumberField(null=True,default=None)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.last_name
   