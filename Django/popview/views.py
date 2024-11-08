import random
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import *  # Asegúrate de importar Generos
from .serializers import *  # Asegúrate de tener el serializer correcto
from collections import defaultdict

# Autentificación
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import check_password

# Importaciones para el video
import re
from django.http import StreamingHttpResponse, Http404, JsonResponse
from wsgiref.util import FileWrapper
import os

class GenerosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Generos.objects.all().order_by('nombre')  # Ordena alfabéticamente
    serializer_class = GenerosSerializer  # Asegúrate de que este serializer esté definido
    permission_classes = [permissions.AllowAny]


class MediaDetailView(generics.RetrieveAPIView):
    queryset = Medias.objects.all()
    serializer_class = MediasSerializer
    lookup_field = 'id'

class RandomMediasView(APIView):
    def get(self, request, *args, **kwargs):
        cantidad = 6

        # Recupera todas las instancias de Medias
        all_medias = Medias.objects.all()

        # Verifica que haya al menos 20 medias disponibles
        if all_medias.count() < cantidad:
            return Response({"error": "Not enough media available."}, status=404)

        # Selecciona 2 medias de forma aleatoria
        random_medias = random.sample(list(all_medias), cantidad)

        # Serializa los objetos seleccionados
        serializer = MediasSerializer(random_medias, many=True, context={'request': request})
        return Response(serializer.data)
    
class CapitulosDetailView(generics.RetrieveAPIView):
    queryset = Capitulos.objects.all()
    serializer_class = CapitulosSerializer
    lookup_field = 'id'  # Esto permitirá buscar por ID

@method_decorator(csrf_exempt, name='dispatch')
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        correo = data.get('correo')
        password = data.get('password')

        try:
            # Buscar el usuario por correo electrónico
            usuario = Cuentas.objects.get(correo=correo)
            
            # Verificar la contraseña
            if check_password(password, usuario.password):
                # Generar un token JWT o manejar la sesión
                # Aquí deberías generar un token JWT, pero por simplicidad devolvemos un mensaje de éxito
                return JsonResponse({'success': True, 'message': 'Inicio de sesión exitoso'})
            else:
                return JsonResponse({'success': False, 'message': 'Contraseña incorrecta'}, status=401)
        except Cuentas.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Usuario no encontrado'}, status=404)
    return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)


def stream_video(request, video_id):
    try:
        # Obtiene el capítulo por ID
        chapter = Capitulos.objects.get(id=video_id)

        # Verifica qué resolución se solicita
        requested_resolution = request.GET.get('resolution', '1080p')  # Default to 1080p

        # Selecciona la ruta del video según la resolución solicitada
        if requested_resolution == '1080p' and chapter.video_1080p:
            video_path = chapter.video_1080p.path
        elif requested_resolution == '720p' and chapter.video_720p:
            video_path = chapter.video_720p.path
        elif requested_resolution == '480p' and chapter.video_480p:
            video_path = chapter.video_480p.path
        elif requested_resolution == '360p' and chapter.video_360p:
            video_path = chapter.video_360p.path
        else:
            raise Http404("La resolución solicitada no está disponible.")

        # Verifica que el archivo existe
        if not os.path.exists(video_path):
            raise Http404("El video no fue encontrado.")

        file = open(video_path, 'rb')
        file_size = os.path.getsize(video_path)
        start = 0
        end = file_size - 1

        # Maneja el rango de bytes
        if 'Range' in request.headers:
            range_header = request.headers['Range'].strip()
            range_match = re.match(r'bytes=(\d+)-(\d*)', range_header)
            if range_match:
                start = int(range_match.group(1))
                end = int(range_match.group(2)) if range_match.group(2) else end
            
            # Verifica que el rango es válido
            if start >= file_size or end >= file_size or start > end:
                raise Http404("Rango no válido.")

        file.seek(start)
        response = StreamingHttpResponse(FileWrapper(file), status=206 if 'Range' in request.headers else 200)
        response['Content-Type'] = 'video/mp4'
        response['Content-Length'] = str(end - start + 1)
        response['Content-Range'] = f'bytes {start}-{end}/{file_size}'
        response['Accept-Ranges'] = 'bytes'
        return response

    except Capitulos.DoesNotExist:
        raise Http404("Capítulo no encontrado.")
    except FileNotFoundError:
        raise Http404("El video no fue encontrado.")