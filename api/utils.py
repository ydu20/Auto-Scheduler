from rest_framework.response import Response
import requests
import json

def searchCourses(request, query):
    r = requests.get('https://penncourseplan.com/api/base/current/search/courses/?search=' + query)
    temp = json.loads(r.text)
    final = [d for d in temp if d.get('title') != '']
    return Response(final)

def getCourseDetail(request, id):
    r = requests.get('https://penncourseplan.com/api/base/current/courses/' + id)
    temp = json.loads(r.text)
    return Response(temp)


