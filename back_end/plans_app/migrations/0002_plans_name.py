# Generated by Django 4.2.4 on 2023-08-18 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plans_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='plans',
            name='name',
            field=models.CharField(default='Unknown', max_length=255),
        ),
    ]
