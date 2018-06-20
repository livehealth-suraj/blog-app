# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from blogs.models import Blog


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    fields = ['title', 'description', 'user']
    list_display = ['title', 'description', 'publish_date', 'user']
    search_fields = ['title']

