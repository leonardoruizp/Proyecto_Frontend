# Despliegue y compilación local y en GitHub Pages del Frontend del Proyecto

El siguiente documento explica los pasos necesarios para que se pueda levantar el Frontend del proyecto de forma local y en GitHub Pages

## 1. Requisitos Previos
- Navegador moderno
- Backend corriendo
- Git
- CURL para realizar las pruebas desde consola
- NGINX ALPHINE para correrlo localmente
- Clonar el repositorio y estar en la rama Master

``` bash
git clone
cd Proyecto_Frontend
```

---

## 2. Despliegue local

### 2.1 Editar archivo application.properties

Editar el archivo app.js

Modificar la siguiente línea si el backend está corriendo localmente:
``` bash
const API = "http://localhost:8080"; 
```

o si está corriendo en Railway:
``` bash
const API = "https://proyectobackend-production-19cb.up.railway.app";
```
### 2.2 Desplegar usando NGINX

Abrir nuestra carpeta en consola y correr el siguiente comando:

```bash
docker run -it --rm -v $(pwd -W):/usr/share/nginx/html -p 5500:80 --name=frontend nginx:alpine
```

### 2.3 Abrir en el navegador
`http://localhost:5500`

## 3. Despliegue en GitHub Pages

### 3.1 Subir repositorio a GitHub
### 3.2 Dirigirse a Settings -> Pages
### 3.3 Seleccionar la rama master y la carpeta root
### 3.4 GitHub generará una URL como:
`https://leonardoruizp.github.io/Proyecto_Frontend/`