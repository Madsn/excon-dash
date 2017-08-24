# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-24 07:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StateChange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(editable=False)),
                ('event_number', models.IntegerField(blank=True)),
                ('virtual_clock', models.DateTimeField(blank=True, null=True)),
                ('message', models.CharField(blank=True, max_length=128)),
                ('clock_speed', models.FloatField()),
            ],
        ),
    ]
