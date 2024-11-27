from django.contrib import admin  # type: ignore
from django.urls import path, include, re_path  # type: ignore
from django.conf import settings  # type: ignore
from django.conf.urls.static import static  # type: ignore
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("popview/", include("popview.urls")),
    re_path(
        r"^(?!admin|static).*$", views.index
    ),  # Redirige cualquier ruta no encontrada a `index.html`
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL_IMAGENES, document_root=settings.MEDIA_ROOT_IMAGENES
    )
    urlpatterns += static(
        settings.MEDIA_URL_IMAGENES2, document_root=settings.MEDIA_ROOT_IMAGENES2
    )
    urlpatterns += static(
        settings.MEDIA_URL_VIDEOS, document_root=settings.MEDIA_ROOT_VIDEOS
    )
    urlpatterns += static(
        settings.MEDIA_URL_ICONOS, document_root=settings.MEDIA_ROOT_ICONOS
    )

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
