from rest_framework import serializers
from .models import Plans
from user_app.serializers import UserSerializer

class PlanSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Plans
        fields = ['id','user']