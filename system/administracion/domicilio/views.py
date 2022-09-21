from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login,logout, authenticate
from django.http import HttpResponse,JsonResponse
from django.db import IntegrityError
from .models import Domicilio
from django.utils import timezone
from django.contrib.auth.decorators import login_required

import json
from django.core import serializers


@login_required
def index(request):
    domicilios = Domicilio.objects.all().order_by('-id')
    return render(request, 'index.html', {'domicilios':domicilios})

@login_required
def form(request):
    if request.method == 'GET':
        return render(request, 'form.html')
    else:
        try:
            # form = CondominioForm(request.POST)
            # form.fechaRegisto= timezone.now()
            # form.save()
            return redirect('domicilio')
        except:
            return render(request, 'form.html')


def list(request):
    dt_list = []
    datos = Domicilio.objects.all().order_by('id')
    for item in datos:
        dt_list.append(dict(id=item.id,codigo=item.codigo,numero=item.numero))
    return JsonResponse(dt_list, safe=False)




