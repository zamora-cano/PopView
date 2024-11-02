from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *  # Cambia a GenerosViewSet

router = DefaultRouter()
router.register('generos', GenerosViewSet, basename='generos')

urlpatterns = [
    path('v1/', include(router.urls)),
    path('v1/medias/random/', RandomMediasView.as_view(), name='random_medias'),  # Nueva ruta para medias aleatorias
    path('v1/media/<int:id>/', MediaDetailView.as_view(), name='media-detail'),
    path('v1/capitulos/<int:id>/', CapitulosDetailView.as_view(), name='capitulo-detail'),  # Para vista basada en clase
    path('v1/stream/<int:video_id>/', stream_video, name='stream_video'),  # Para vista basada en clase
]
