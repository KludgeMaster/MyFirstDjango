from __future__ import unicode_literals
from django.db import models

import datetime

class Threat(models.Model):
  incident_date = models.DateTimeField()
  filename_text = models.TextField( max_length = 100 )
  action_text = models.TextField( max_length = 30 )
  submittype_text = models.TextField( max_length = 30)
  rating_text = models.TextField( max_length = 15)
