# habitos_atomicos
APP de Programación Avanzada para TDS

Creado por: **Manuel Santos - 18001167**

## Descripción
Este proyecto permite a los usuarios crear y gestionar hábitos diarios utilizando una API REST construida con Express.js y MongoDB Atlas.

# Backend

### Navegar al directorio backend
Para inicializar el backend es necesario ubicarse en la carpeta **backend**

```bash
cd backend
```

### Crear archivo .env
Copiar el archivo `.env_example` y renombrarlo a `.env`. Luego, actualizar las credenciales con tus valores:

```bash
# En Windows
copy .env_example .env

# En Linux/Mac
cp .env_example .env
```

Abre el archivo `.env` y actualiza las variables con tus credenciales:
```
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/habitosApp
PORT=3000
```

### Instalar dependencias
Instalar todas las dependencias recomendado node >= 22.14.0

```bash
npm install
```

### Iniciar el servidor
```bash
npm start
```

> **Nota:** El servidor estará disponible en http://localhost:3000


