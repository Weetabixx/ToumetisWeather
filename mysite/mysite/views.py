#imports
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.templatetags.static import static
import requests
import json


location_url_base = 'http://interview.toumetisanalytics.com/location/'
weather_url_base = 'http://interview.toumetisanalytics.com/weather/'

headers = {'Content-Type': 'application/json'}


def index(request, location='london'):
    error = False
    api_url = location_url_base + location

    response = requests.get(api_url, headers=headers)

    result1 = {}
    woeid = '0'
    if response.status_code == 200:
        result1 = json.loads(response.content.decode('utf-8'))[0]
        woeid = str(result1['woeid'])
    else:
        print("invalid response from /location")
        error = True



    api_url = location_url_base + woeid

    response = requests.get(api_url, headers=headers)

    result2 = {}
    if response.status_code == 200:
        result2 = json.loads(response.content.decode('utf-8'))
    else:
        print("invalid response from /weather ")
        error = True


    context = result1
    template = loader.get_template('index.html')
    if error:
        template = loader.get_template('error.html')
        return HttpResponse(template.render(context))
    return HttpResponse(template.render(context))