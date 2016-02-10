# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-15 05:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Threat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename_text', models.TextField(max_length=100)),
                ('action_text', models.TextField(max_length=30)),
                ('submittype_text', models.TextField(max_length=30)),
                ('rating_text', models.TextField(max_length=15)),
            ],
        ),
    ]
