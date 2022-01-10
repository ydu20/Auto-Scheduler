from django.shortcuts import render
# from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import searchCourses, getCourseDetail

# Create your views here.



@api_view(['GET'])
def getCourses(request, query):
    return searchCourses(request, query)

@api_view(['GET'])
def getCourse(request, courseid):
    return getCourseDetail(request, courseid)

