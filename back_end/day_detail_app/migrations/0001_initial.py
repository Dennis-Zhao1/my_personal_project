# Generated by Django 4.2.4 on 2023-08-11 18:06

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('trips_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Day_detail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)])),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trips_app.trips')),
            ],
        ),
    ]
