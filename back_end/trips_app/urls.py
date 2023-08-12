from django.urls import path,include
from .views import all_trips

urlpatterns = [
    path('', all_trips.as_view(),name="all_trips")
]
