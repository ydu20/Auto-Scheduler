from django.shortcuts import render
# from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import searchCourses, getCourseDetail
from .sched_gen.sched_gen import generate_schedule

# Create your views here.


@api_view(['GET'])
def getCourses(request, query):
    return searchCourses(request, query)

@api_view(['GET'])
def getCourse(request, courseid):
    return getCourseDetail(request, courseid)

@api_view(['POST'])
def generateSchedule(request):
    return generate_schedule(request)