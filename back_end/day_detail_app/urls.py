from django.urls import path,include
from .views import all_days,a_day

urlpatterns = [
    path('', all_days.as_view(),name="all_days"),
    path('<int:day_day>/', a_day.as_view(),name="a_day"),
    path('<int:day_day>/times/', include("time_detail_app.urls")),
]
