# Generated by Django 4.2.4 on 2023-08-11 18:05

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('plans_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Trips',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(default='Unknown')),
                ('start_day', models.DateField(default=datetime.date(2023, 8, 12))),
                ('end_day', models.DateField(null=True)),
                ('plans', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plans_app.plans')),
            ],
        ),
    ]
