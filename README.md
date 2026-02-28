# Entrega N°2 – Backend Node.js | CoderHouse

**Alumno:** Facundo Altamirano

---

## Descripción

Este proyecto es la continuación de la primera entrega del curso de Backend con Node.js de CoderHouse.

Se incorporó un motor de plantillas (**Handlebars**) y comunicación en tiempo real mediante **WebSockets** (Socket.io), manteniendo toda la funcionalidad de la API REST desarrollada anteriormente.

---

## Tecnologías utilizadas

- Node.js
- Express
- Handlebars (express-handlebars)
- Socket.io
- File System (fs)
- dotenv
- Nodemon (entorno de desarrollo)

---

## Estructura del proyecto

```
src/
├─ app.js
├─ routes/
│  ├─ products.router.js
│  ├─ carts.router.js
│  └─ views.router.js
├─ managers/
│  ├─ ProductManager.js
│  └─ CartManager.js
└─ views/
   ├─ layouts/
   │  └─ main.handlebars
   ├─ home.handlebars
   └─ realTimeProducts.handlebars

data/
├─ products.json
└─ carts.json
```

---

## Vistas disponibles

| Ruta                | Vista                       | Descripción                                         |
| ------------------- | --------------------------- | --------------------------------------------------- |
| `/`                 | home.handlebars             | Lista estática de todos los productos               |
| `/realtimeproducts` | realTimeProducts.handlebars | Lista de productos con actualización en tiempo real |

---

## API Endpoints

**Productos** (`/api/products`)

- `GET /` → Listar todos los productos
- `GET /:pid` → Obtener producto por ID
- `POST /` → Crear un nuevo producto
- `PUT /:pid` → Actualizar un producto
- `DELETE /:pid` → Eliminar un producto

**Carritos** (`/api/carts`)

- `POST /` → Crear un nuevo carrito
- `GET /:cid` → Listar productos del carrito
- `POST /:cid/product/:pid` → Agregar producto al carrito

---

## ¿Cómo funciona el tiempo real?

Cuando se crea o elimina un producto a través de la API REST, el servidor emite un evento de Socket.io con la lista actualizada. La vista `/realtimeproducts` escucha ese evento y re-renderiza la lista automáticamente, sin necesidad de recargar la página.

La conexión entre HTTP y WebSockets se resuelve pasando la instancia de `io` a través de `req.io` en cada request, lo que permite emitir eventos desde dentro de los routers de Express.

---

## Configuración

El servidor escucha en el puerto definido en el archivo `.env`:

```
PORT=8080
```

---

## Observaciones

- No se incluye la carpeta `node_modules`
- La persistencia se mantiene en archivos JSON dentro de `/data`
