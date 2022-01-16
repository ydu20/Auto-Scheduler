import json
from .section import Section
from .course import Course
from functools import cmp_to_key
from rest_framework.response import Response


def parse_request(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    courses = []

    for course in reversed(body):
        sections = []
        for sec in course.get('sections'):
            if sec.get('activity') != 'LEC':
                break
            else:
                ids = {}
                timeframes = []
                for timeframe in sec.get('meetings'):
                    pair = []
                    pair.append(timeframe.get('day')+str(timeframe.get('start')))
                    pair.append(timeframe.get('day')+str(timeframe.get('end')))
                    timeframes.append(pair)
                
                ids[sec.get('id')] = timeframes

                quality = sec.get('course_quality')
                difficulty = sec.get('difficulty')
                
                recs = sec.get('associated_sections')
                
                if (len(recs) <= 3 and len(recs) > 0):
                    ## can really be obtimized
                    for rec in recs:
                        rec_id = rec.get('id')
                        for rec_obj in course.get('sections'):
                            if (rec_obj.get('id') == rec_id):
                                temp_ids = ids.copy()
                                rec_timeframes = []
                                for timeframe2 in rec_obj.get('meetings'):
                                    pair2 = []
                                    pair2.append(timeframe2.get('day')+str(timeframe2.get('start')))
                                    pair2.append(timeframe2.get('day')+str(timeframe2.get('end')))
                                    rec_timeframes.append(pair2)
                                temp_ids[rec_id] = rec_timeframes
                                sections.append(Section(temp_ids, quality, difficulty))
                else:
                    sections.append(Section(ids, quality, difficulty))
        courses.append(Course(course.get('id'), sections))

    return courses

def time_conflict(t1, t2):
    for x in t1:
        for y in t2:
            if (x==y):
                return True
    return False

def sched_conflict(curr_sched, new_sec):
    for sec in curr_sched:
        if (time_conflict(sec.get_timeframes()[0], new_sec.get_timeframes()[0])):
            return True
    return False

def generate_schedules(schedules, courses, curr_sched):
    if (len(courses) > 0):
        course = courses.pop()
        for section in course.get_sections():
            new_courses = courses.copy()
            new_sched = curr_sched.copy()
            if (not sched_conflict(curr_sched, section)):
                new_sched.append(section)
                generate_schedules(schedules, new_courses, new_sched)
    else:
        if (len(curr_sched) > 0):
            schedules.append(curr_sched)


def score_by_time_quality(schedule):
    # create 5 lists of times for each day
    time_arr = [[] for _ in range(5)]
    score = 0
    
    for sec in schedule:
        for time in sec.get_timeframes()[0]:
            if (time[0] == 'M'):
                time_arr[0].append(float(time[1:]))
            elif (time[0] == 'T'):
                time_arr[1].append(float(time[1:]))
            elif (time[0] == 'W'):
                time_arr[2].append(float(time[1:]))
            elif (time[0] == 'R'):
                time_arr[3].append(float(time[1:]))
            else:
                time_arr[4].append(float(time[1:]))
    
    ## 8:30 classes?
    for day in time_arr:
        day.sort()
        if (len(day) == 0 or day[0] != 8.3):
            score += 100
    
    ## friday classes?
    score -= len(time_arr[4]) * 20
    
    ## cohesion?
    for day in time_arr:
        if (len(day) != 0):
            score -= (int(day[-1])-int(day[0]))*2
    return score

def compare_by_time_quality(schedule1, schedule2):
    return score_by_time_quality(schedule2) - score_by_time_quality(schedule1)

def schedule_transform(schedule):
    return list(map(lambda sec: sec.to_dict(), schedule))

def generate_schedule(request):
    courses = parse_request(request)

    schedules = []
    generate_schedules(schedules, courses, [])
    
    schedules.sort(key=cmp_to_key(compare_by_time_quality))

    schedules = schedules[0:min(4, len(schedules)-1)]
    
    schedules_processed = list(map(schedule_transform, schedules))

    return Response(schedules_processed)

