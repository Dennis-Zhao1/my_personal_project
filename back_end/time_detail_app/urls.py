from django.urls import path,include
from .views import all_times

urlpatterns = [
    path('', all_times.as_view(),name="all_times")
]
