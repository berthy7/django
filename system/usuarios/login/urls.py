
from django.shortcuts import render
from django.urls import path,include
from system.usuarios.login.views import logon,signout

urlpatterns = [
path('', logon, name='login'),
path('logout/', signout, name='logout'),
]