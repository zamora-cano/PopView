# PopView - PWA para Visualizar Películas y Series

**PopView** es una aplicación web progresiva (PWA) similar a Netflix, donde los usuarios pueden ver películas y series. El proyecto está compuesto por un **backend en Django** y un **frontend en React**. Los archivos estáticos generados por React se sirven a través de Django para una integración fluida.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

-   **Python** (versión 3.8 o superior)
-   **Node.js** (versión 14 o superior)
-   **npm** (administrador de paquetes de Node.js)
-   **Git** (para gestionar el repositorio)

## Instalación y Configuración

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
    git clone https://github.com/tu-usuario/popview.git
    cd popview
```

```bash

```

### 2. Configurar el backend (Django)

Crear un entorno virtual (opcional, pero recomendado):

```bash
python -m venv venv
```

Activar el entorno virtual:

-   En Windows:

```bash
.\venv\Scripts\activate
```

-   En macOS/Linux:

```bash
source venv/bin/activate
```

Instalar las dependencias del backend:

```bash
pip install -r requirements.txt
```

Configurar las migraciones de la base de datos:

```bash
python manage.py migrate
```

Crear un superusuario para acceder al panel de administración de Django:

```bash
python manage.py createsuperuser
```

Sigue las instrucciones para crear el superusuario.

3. Configurar el frontend (React)
   Instalar las dependencias del frontend:

Navega a la carpeta frontend y ejecuta:

```bash
cd frontend
npm install
```

Generar el build de React:

Una vez que hayas configurado las dependencias, genera la versión de producción de la aplicación React:

```bash
npm run build
```

Este comando creará una carpeta build con los archivos estáticos que serán servidos por Django.

4. Configuración de archivos estáticos en Django
   Asegúrate de que tu configuración de Django esté correctamente configurada para servir archivos estáticos:

En el archivo settings.py de Django, agrega la siguiente configuración para los archivos estáticos:

```bash
STATICFILES_DIRS = [
BASE_DIR / "frontend/build/static",
]

TEMPLATES = [
{
'BACKEND': 'django.template.backends.django.DjangoTemplates',
'DIRS': [
BASE_DIR / "frontend/build",
], # Otros ajustes
},
]
```

Ejecutar el servidor Django:

Una vez configurado, puedes iniciar el servidor Django:

```bash
python manage.py runserver
```

Ahora tu aplicación debería estar disponible en http://127.0.0.1:8000/.

Cómo usar la aplicación
Accede al panel de administración de Django en http://127.0.0.1:8000/admin con el superusuario que creaste previamente.
Agrega películas, series y cualquier otro contenido que quieras mostrar en la aplicación.
Desde el frontend, los usuarios pueden visualizar las películas y series en una interfaz interactiva, al estilo de Netflix.
Funcionalidades
Interfaz de usuario intuitiva para navegar por categorías de películas y series.
Visualización de trailers y detalles de cada título.
Sistema de búsqueda para encontrar contenido fácilmente.
Modo offline gracias a la configuración de PWA, permitiendo que la aplicación funcione incluso sin conexión a internet.
