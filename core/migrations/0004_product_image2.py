# Generated by Django 5.0.6 on 2024-08-24 13:12

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image2',
            field=models.ImageField(default='product2.jpg', upload_to=core.models.user_directory_path),
        ),
    ]
