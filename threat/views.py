from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.views.generic import TemplateView

import os

class ThreatView(TemplateView):
  template_name = 'index.html'

def send_json(request):
  data = []
  dir = settings.BASE_DIR
  for file in os.listdir(dir):
    if file.endswith(".meta"):
      file_content = open(dir+"/"+file, 'r')
      data.append(to_json(file_content))
  return JsonResponse(data, safe=False)

def to_json(file):
  file_json = {}
  for line in file:      
    file_json[line[0:line.find(":")].strip()] = line[line.find(":")+1:len(line)].strip()
  return file_json


