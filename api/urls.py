from django.urls import path
from . import views

urlpatterns = [
    path('search/<str:query>', views.getCourses, name = "courses"),
    path('course/<str:courseid>', views.getCourse, name = "course")
]