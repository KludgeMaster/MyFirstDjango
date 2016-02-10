from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.ThreatView.as_view(), name='threat'),
  url(r'^threats/', views.send_json, name='send_json'),
]
