from django.db import models # type: ignore
from django.utils.translation import gettext_lazy as _ # type: ignore
from django.utils import timezone # type: ignore
from django.core.exceptions import ValidationError # type: ignore
from django.contrib.auth.hashers import make_password # type: ignore
from django.conf import settings # type: ignore
from django.core.validators import MinValueValidator, MaxValueValidator # type: ignore
import os
import uuid
from moviepy.editor import VideoFileClip # type: ignore

url_datas = "m/"

class Imagenes(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(_("Nombre"), max_length=50)
    imagen = models.ImageField(_("Imagen"), upload_to=url_datas+'imagenes/', null=True, blank=True)
    perfil = models.BooleanField(_("Perfil"))
    
    def save(self, *args, **kwargs):
        if self.imagen:
            # Obtener la extensión del archivo
            extension = os.path.splitext(self.imagen.name)[1]  # e.g. .png, .jpg
            # Generar un nombre único basado en el nombre de entrada
            unique_name = f"imagen_{self.nombre}_{uuid.uuid4().hex}{extension}"
            # Asignar el nuevo nombre al campo de imagen
            self.imagen.name = unique_name
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Eliminar la imagen del sistema de archivos
        if self.imagen:
            # Construir la ruta completa de la imagen
            imagen_path = os.path.join(settings.MEDIA_ROOT, self.imagen.name)
            if os.path.isfile(imagen_path):
                os.remove(imagen_path)  # Eliminar el archivo de la imagen
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Posters(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(_("Nombre"), max_length=50)
    imagen = models.ImageField(_("Imagen"), upload_to=url_datas+'imagenes/', null=True, blank=True)  
    
    def save(self, *args, **kwargs):
        if self.imagen:
            extension = os.path.splitext(self.imagen.name)[1] 
            unique_name = f"poster_{self.nombre}_{uuid.uuid4().hex}{extension}"
            self.imagen.name = unique_name
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.imagen:
            imagen_path = os.path.join(settings.MEDIA_ROOT, self.imagen.name)
            if os.path.isfile(imagen_path):
                os.remove(imagen_path) 
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Banners(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(_("Nombre"), max_length=50)
    imagen = models.ImageField(_("Imagen"), upload_to=url_datas+'imagenes/', null=True, blank=True)  

    def save(self, *args, **kwargs):
        if self.imagen:
            extension = os.path.splitext(self.imagen.name)[1] 
            unique_name = f"baner_{self.nombre}_{uuid.uuid4().hex}{extension}"
            self.imagen.name = unique_name
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.imagen:
            imagen_path = os.path.join(settings.MEDIA_ROOT, self.imagen.name)
            if os.path.isfile(imagen_path):
                os.remove(imagen_path) 
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Covers(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(_("Nombre"), max_length=50)	
    imagen = models.ImageField(_("Imagen"), upload_to=url_datas+'imagenes/', null=True, blank=True)  

    def save(self, *args, **kwargs):
        if self.imagen:
            extension = os.path.splitext(self.imagen.name)[1] 
            unique_name = f"cover_{self.nombre}_{uuid.uuid4().hex}{extension}"
            self.imagen.name = unique_name
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.imagen:
            imagen_path = os.path.join(settings.MEDIA_ROOT, self.imagen.name)
            if os.path.isfile(imagen_path):
                os.remove(imagen_path) 
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.nombre 

class Cuentas(models.Model):
    STATUS_CHOICES = [
        ('nuevo', _('Nuevo')),
        ('sin_pagar', _('Sin Pagar')),
        ('pagado', _('Pagado')),
        ('suspendido', _('Suspendido')),
        ('cancelado', _('Cancelado')),
        ('activa', _('Activa')),
    ]

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(_("Nombre"), max_length=100)
    correo = models.EmailField(_("Correo electrónico"), unique=True)
    password = models.CharField(_("Contraseña"), max_length=128)
    fecha_creacion = models.DateTimeField(_("Fecha de creación"), default=timezone.now)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='nuevo', null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id:  # Si es un nuevo registro
            self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre 

class Usuarios(models.Model):
    id = models.AutoField(primary_key=True)
    cuenta = models.ForeignKey(Cuentas, on_delete=models.CASCADE, related_name="usuarios", verbose_name=_("Cuenta"))
    imagen = models.ForeignKey(Imagenes, on_delete=models.CASCADE, related_name="usuarios", verbose_name=_("Imagen"))
    nombre = models.CharField(_("Nombre"), max_length=100)
    password = models.CharField(_("Contraseña"), max_length=128)
    infantil = models.BooleanField(_("Infantil"), default=False)
    fecha_creacion = models.DateTimeField(_("Fecha de creación"), default=timezone.now)
    status = models.CharField(max_length=25, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id:  # Si es un nuevo registro
            self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Generos(models.Model):
    id = models.AutoField(primary_key=True)
    imagen = models.ImageField(_("Imagen"), upload_to=url_datas+'iconos/', null=True, blank=True)  
    nombre = models.CharField(_("Nombre"), max_length=50)

    def save(self, *args, **kwargs):
        if self.imagen:
            extension = os.path.splitext(self.imagen.name)[1] 
            unique_name = f"icon_{self.nombre}_{uuid.uuid4().hex}{extension}"
            self.imagen.name = unique_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Medias(models.Model):
    STATUS_CHOICES = [
        ('nuevo', _('Nuevo')),
        ('en_transmision', _('En Transmisión')),
        ('terminada', _('Terminada')),
        ('eliminado', _('Eliminado')),
        ('activo', _('Activo')),
        ('por_eliminar', _('Por Eliminar')),
    ]

    id = models.AutoField(primary_key=True)
    cover = models.ForeignKey(Covers, on_delete=models.CASCADE, related_name="medias_cover", verbose_name=_("Cover"))
    banner = models.ForeignKey(Banners, on_delete=models.CASCADE, related_name="medias_banner", verbose_name=_("Banner"))
    poster = models.ForeignKey(Posters, on_delete=models.CASCADE, related_name="medias_poster", verbose_name=_("Poster"))
    nombre = models.CharField(_("Nombre"), max_length=80)
    descripcion = models.TextField(_("Descripción"))
    serie = models.BooleanField(_("Serie"), default=False)
    infantil = models.BooleanField(_("Infantil"), default=False)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='nuevo')
    generos = models.ManyToManyField(Generos, related_name='medias', verbose_name=_("Géneros"))
    ibm = models.DecimalField(_("IBM"), max_digits=3, decimal_places=1, validators=[MinValueValidator(1.0),  MaxValueValidator(10.0), ],)    
    
    def __str__(self):
        return self.nombre

class Capitulos(models.Model):
    STATUS_CHOICES = [
        ('nuevo', _('Nuevo')),
        ('en_transmision', _('En Transmisión')),
        ('terminada', _('Terminada')),
        ('eliminado', _('Eliminado')),
        ('activo', _('Activo')),
        ('por_eliminar', _('Por Eliminar')),
    ]
      
    id = models.AutoField(primary_key=True)
    media = models.ForeignKey(Medias, on_delete=models.CASCADE, related_name="capitulos_media", verbose_name=_("Media"))
    cover = models.ForeignKey(Covers, on_delete=models.PROTECT, related_name="capitulos_cover", verbose_name=_("Cover"))
    nombre = models.CharField(_("Nombre"), max_length=80)
    descripcion = models.TextField(_("Descripción"), null=True, blank=True)
    numero_capitulo = models.SmallIntegerField(_("Número de capítulo"), null=True, blank=True)
    temporada = models.SmallIntegerField(_("Temporada"), null=True, blank=True)
    ibm = models.DecimalField(_("IBM"), max_digits=3, decimal_places=1, validators=[MinValueValidator(1.0),  MaxValueValidator(10.0), ], null=True, blank=True)    
    intro_start = models.PositiveSmallIntegerField(_("Intro Start"), null=True, blank=True)
    intro_end = models.PositiveSmallIntegerField(_("Intro End"),null=True, blank=True)
    end = models.SmallIntegerField(_("End"))
    video_1080p = models.FileField(_("Video 1080p"), upload_to=url_datas+'videos/1080p/', null=True, blank=True)
    video_720p = models.FileField(_("Video 720p"), upload_to=url_datas+'videos/720p/', null=True, blank=True)
    video_480p = models.FileField(_("Video 480p"), upload_to=url_datas+'videos/480p/', null=True, blank=True)
    video_360p = models.FileField(_("Video 360p"), upload_to=url_datas+'videos/360p/', null=True, blank=True)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='nuevo')

    def save(self, *args, **kwargs):
        # Función auxiliar para generar el nombre único del archivo
        def generate_unique_name(resolution):
            extension = os.path.splitext(getattr(self, f'video_{resolution}').name)[1]
            unique_name = f"video_{self.nombre}_{resolution}_{uuid.uuid4().hex}{extension}"
            return unique_name

        # Verifica y genera el nombre único para cada resolución si el archivo existe
        if self.video_1080p:
            self.video_1080p.name = generate_unique_name("1080p")
        if self.video_720p:
            self.video_720p.name = generate_unique_name("720p")
        if self.video_480p:
            self.video_480p.name = generate_unique_name("480p")
        if self.video_360p:
            self.video_360p.name = generate_unique_name("360p")

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class CapituloSubtitulo(models.Model):
    capitulo = models.ForeignKey(Capitulos, on_delete=models.CASCADE, related_name="subtitulos")
    idioma = models.CharField(_("Idioma"), max_length=10, choices=[('es', 'Español'), ('en', 'Inglés'), ('fr', 'Francés'), ('de', 'Alemán')])  # Agrega los idiomas que necesites
    archivo = models.FileField(_("Archivo de Subtítulo"), upload_to=url_datas+'subtitulos/', null=True, blank=True)

    def __str__(self):
        return f"{self.capitulo.nombre} - {self.get_idioma_display()}"


class Vistas(models.Model):
    id = models.AutoField(primary_key=True)
    media = models.ForeignKey(Medias, on_delete=models.PROTECT, related_name="vistas_media", verbose_name=_("Media"))
    usuario = models.ForeignKey(Usuarios, on_delete=models.PROTECT, related_name="vistas_usuario", verbose_name=_("Usuario"))
    fecha = models.DateTimeField(_("Fecha de creación"), default=timezone.now)
    segundo = models.PositiveSmallIntegerField(_("Segundo"))

    def __str__(self):
        return f"{self.usuario.nombre} vio {self.media.nombre}"


class Deseos(models.Model):
    id = models.AutoField(primary_key=True)
    media = models.ForeignKey(Medias, on_delete=models.PROTECT, related_name="deseo_media", verbose_name=_("Media"))
    usuario = models.ForeignKey(Usuarios, on_delete=models.PROTECT, related_name="deseo_usuario", verbose_name=_("Usuario"))
    fecha = models.DateTimeField(_("Fecha de creación"), default=timezone.now)

    def __str__(self):
        return f"{self.usuario.nombre} desea {self.media.nombre}"
