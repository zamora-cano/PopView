# Generated by Django 4.2.16 on 2024-10-16 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('popview', '0019_remove_capitulos_video_capitulos_video_1080p_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='capitulos',
            name='status',
            field=models.CharField(choices=[('nuevo', 'Nuevo'), ('en_transmision', 'En Transmisión'), ('terminada', 'Terminada'), ('eliminado', 'Eliminado'), ('activo', 'Activo'), ('por_eliminar', 'Por Eliminar')], default='nuevo', max_length=25),
        ),
        migrations.AlterField(
            model_name='cuentas',
            name='status',
            field=models.CharField(blank=True, choices=[('nuevo', 'Nuevo'), ('sin_pagar', 'Sin Pagar'), ('pagado', 'Pagado'), ('suspendido', 'Suspendido'), ('cancelado', 'Cancelado'), ('activa', 'Activa')], default='nuevo', max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='medias',
            name='status',
            field=models.CharField(choices=[('nuevo', 'Nuevo'), ('en_transmision', 'En Transmisión'), ('terminada', 'Terminada'), ('eliminado', 'Eliminado'), ('activo', 'Activo'), ('por_eliminar', 'Por Eliminar')], default='nuevo', max_length=25),
        ),
        migrations.CreateModel(
            name='CapituloSubtitulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idioma', models.CharField(choices=[('es', 'Español'), ('en', 'Inglés'), ('fr', 'Francés'), ('de', 'Alemán')], max_length=10, verbose_name='Idioma')),
                ('archivo', models.FileField(blank=True, null=True, upload_to='m/subtitulos/', verbose_name='Archivo de Subtítulo')),
                ('capitulo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subtitulos', to='popview.capitulos')),
            ],
        ),
    ]
