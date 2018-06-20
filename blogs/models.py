# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class Blog(models.Model):
    title = models.TextField(max_length=100)
    description = models.TextField(max_length=500)
    publish_date = models.DateTimeField(blank=False, null=False, default=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
