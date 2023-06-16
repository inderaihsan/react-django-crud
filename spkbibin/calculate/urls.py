
from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path("init/", views.init),
    path("calculatespk", views.calculatespk, name = "calculatespk"),
]
