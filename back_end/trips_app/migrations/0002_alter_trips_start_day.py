# Generated by Django 4.2.4 on 2023-08-17 00:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trips',
            name='start_day',
            field=models.DateField(default=datetime.date(2023, 8, 18)),
        ),
    ]
