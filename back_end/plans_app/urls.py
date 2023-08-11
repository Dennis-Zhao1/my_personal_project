from django.urls import path,include
from .views import all_plans

urlpatterns = [
    path('', all_plans.as_view(),name="all_plans")
]
