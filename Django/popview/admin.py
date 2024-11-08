from django.contrib import admin # type: ignore
from .models import *

# Register your models here.

class AccountAdmin(admin.ModelAdmin):
    list_editable = ['status']
    list_display = ['nombre','correo', 'fecha_creacion', 'status']
class UserAdmin(admin.ModelAdmin):
    list_editable = ['status']
    list_display = ['nombre', 'fecha_creacion', 'status']

admin.site.register(Imagenes)
admin.site.register(Posters)
admin.site.register(Banners)
admin.site.register(Covers)
admin.site.register(Cuentas, AccountAdmin)
admin.site.register(Usuarios, UserAdmin)
admin.site.register(Generos)
admin.site.register(Medias)
admin.site.register(Capitulos)
admin.site.register(Vistas)
admin.site.register(Deseos)

