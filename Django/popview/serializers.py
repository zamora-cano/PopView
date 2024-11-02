from rest_framework import serializers
from .models import *
from collections import defaultdict


class GenerosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generos
        fields = ['id', 'nombre', 'imagen'] 

class CoversSerializer(serializers.ModelSerializer):
    class Meta:
        model = Covers
        fields = ['id', 'nombre', 'imagen']  # Asegúrate de incluir el campo imagen

class BannersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banners
        fields = ['id', 'nombre', 'imagen']  # Asegúrate de incluir el campo imagen

class PostersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posters
        fields = ['id', 'nombre', 'imagen']  # Asegúrate de incluir el campo imagen

class CapitulosSerializer(serializers.ModelSerializer):
    cover_url = serializers.SerializerMethodField()
    stream_url = serializers.SerializerMethodField()  # Nueva URL para streaming

    class Meta:
        model = Capitulos
        fields = [
            "id",
            "media",
            "cover_url",
            "stream_url",  # Agrega la nueva URL al serializador
            "nombre",
            "descripcion",
            "numero_capitulo",
            "temporada",
            "ibm",
            "intro_start",
            "intro_end",
            "end",
            "video_1080p",
            "video_720p",
            "video_480p",
            "video_360p",
            "status",
        ]

    def get_cover_url(self, obj):
        request = self.context.get('request')
        if obj.cover:
            return request.build_absolute_uri(obj.cover.imagen)
        return None
    
    def get_stream_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/popview/v1/stream/{obj.id}/')  # URL para streaming


        
class MediasSerializer(serializers.ModelSerializer): 
    cover_url = serializers.SerializerMethodField()
    banner_url = serializers.SerializerMethodField()
    poster_url = serializers.SerializerMethodField()
    generos_nombres = serializers.SerializerMethodField()
    capitulos = serializers.SerializerMethodField()  # Usamos SerializerMethodField para personalizar la estructura

    class Meta:
        model = Medias
        fields = [
            'id', 
            'cover_url',  
            'banner_url',
            'poster_url',
            'nombre',
            'descripcion',
            'serie',
            'infantil',
            'status',
            'generos_nombres',
            'ibm',
            "capitulos",
        ]

    def get_cover_url(self, obj):
        request = self.context.get('request')
        if obj.cover and obj.cover.imagen:
            return request.build_absolute_uri(obj.cover.imagen.url)
        return None
    
    def get_banner_url(self, obj):
        request = self.context.get('request')
        if obj.banner and obj.banner.imagen:
            return request.build_absolute_uri(obj.banner.imagen.url)
        return None
    
    def get_poster_url(self, obj):
        request = self.context.get('request')
        if obj.poster and obj.poster.imagen:
            return request.build_absolute_uri(obj.poster.imagen.url)
        return None
    
    def get_generos_nombres(self, obj):
        return [genero.nombre for genero in obj.generos.all()]

    def get_capitulos(self, obj):
        # Agrupamos los capítulos por temporada usando un defaultdict
        capitulos_por_temporada = defaultdict(list)
        
        # Obtenemos y ordenamos los capítulos por temporada y número
        capitulos = obj.capitulos_media.order_by('temporada', 'numero_capitulo')
        
        # Agrupamos los capítulos
        for capitulo in capitulos:
            temporada = capitulo.temporada if capitulo.temporada is not None else 1  # Temporada 1 por defecto si es None
            key = f"temporada {temporada}"
            capitulos_por_temporada[key].append(CapitulosSerializer(capitulo, context=self.context).data)
        
        return capitulos_por_temporada