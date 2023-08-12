from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True,blank=False,null=False, verbose_name='email address',max_length=255)
    phone_number = PhoneNumberField(null=True,default=None)
    first_name = models.CharField(max_length=255,default='Unknown')
    last_name = models.CharField(max_length=255,default='Unknown')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
   