# Generated by Django 4.2.16 on 2024-10-09 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('popview', '0007_remove_covers_url_covers_imagen_videos_video'),
    ]

    operations = [
        migrations.AddField(
            model_name='medias',
            name='ibm',
            field=models.PositiveSmallIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5'), (6, '6'), (7, '7'), (8, '8'), (9, '9'), (10, '10')], null=True, verbose_name='IBM'),
        ),
    ]
