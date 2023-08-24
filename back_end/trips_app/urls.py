from django.urls import path,include
from .views import all_trips, a_trip

urlpatterns = [
    path('', all_trips.as_view(),name="all_trips"),
    path('<str:trip_name>/', a_trip.as_view(),name="a_trip"),
    path('<str:trip_name>/day_detail/', include("day_detail_app.urls")),
]
