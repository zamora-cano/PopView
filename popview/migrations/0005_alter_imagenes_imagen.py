# Generated by Django 4.2.16 on 2024-10-09 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('popview', '0004_alter_imagenes_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagenes',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='m/imagenes/', verbose_name='Imagen'),
        ),
    ]