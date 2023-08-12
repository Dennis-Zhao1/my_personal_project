from django.urls import path,include
from .views import all_days

urlpatterns = [
    path('', all_days.as_view(),name="all_days")
]
