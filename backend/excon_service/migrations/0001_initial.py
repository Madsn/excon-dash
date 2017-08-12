# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-12 18:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_event', models.IntegerField(blank=True)),
                ('message', models.CharField(max_length=250)),
                ('clock_virt_seed', models.DateTimeField()),
                ('clock_virt_rate', models.FloatField()),
                ('clock_real_seed', models.DateTimeField()),
            ],
        ),
    ]
