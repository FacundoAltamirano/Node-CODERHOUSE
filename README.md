# Entrega Final – Backend Node.js | CoderHouse

**Alumno:** Facundo Altamirano

---

## Descripción

Este proyecto es la entrega final del curso de Backend con Node.js de CoderHouse, construido sobre las entregas anteriores.

Se migró la persistencia de archivos JSON a **MongoDB** con **Mongoose**, se profesionalizaron las consultas de productos con filtros, paginación y ordenamiento, y se completó la gestión de carritos con nuevos endpoints.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- mongoose-paginate-v2
- Handlebars (express-handlebars)
- Socket.io
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
├─ models/
│  ├─ Product.js
│  └─ Cart.js
└─ views/
   ├─ layouts/
   │  └─ main.handlebars
   ├─ home.handlebars
   ├─ productDetail.handlebars
   ├─ cart.handlebars
   └─ realTimeProducts.handlebars
```

---

## Vistas disponibles

| Ruta                | Vista                       | Descripción                                       |
| ------------------- | --------------------------- | ------------------------------------------------- |
| `/`                 | home.handlebars             | Lista de productos con paginación y filtros       |
| `/products/:pid`    | productDetail.handlebars    | Detalle del producto con botón agregar al carrito |
| `/carts/:cid`       | cart.handlebars             | Vista del carrito con productos completos         |
| `/realtimeproducts` | realTimeProducts.handlebars | Gestión de productos en tiempo real               |

---

## API Endpoints

**Productos** (`/api/products`)

- `GET /` → Listar productos con paginación, filtros y ordenamiento
- `GET /?query=Abrigos` → Filtrar por categoría
- `GET /?query=true` → Filtrar por disponibilidad
- `GET /?sort=asc` → Ordenar por precio ascendente
- `GET /?sort=desc` → Ordenar por precio descendente
- `GET /:pid` → Obtener producto por ID
- `POST /` → Crear un nuevo producto
- `PUT /:pid` → Actualizar un producto
- `DELETE /:pid` → Eliminar un producto

**Carritos** (`/api/carts`)

- `POST /` → Crear un nuevo carrito
- `GET /:cid` → Listar productos del carrito (con populate)
- `POST /:cid/product/:pid` → Agregar producto al carrito
- `PUT /:cid` → Reemplazar todos los productos del carrito
- `PUT /:cid/products/:pid` → Actualizar cantidad de un producto
- `DELETE /:cid/products/:pid` → Eliminar un producto del carrito
- `DELETE /:cid` → Vaciar el carrito

---

## Paginación

El `GET /api/products` devuelve el siguiente formato:

```json
{
  "status": "success",
  "payload": [...],
  "totalPages": 2,
  "prevPage": null,
  "nextPage": 2,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "/api/products?page=2"
}
```

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```
PORT=8081
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<dbname>
```

---

## Observaciones

- No se incluye la carpeta `node_modules`
- No se incluye el archivo `.env` por seguridad
- La persistencia se realiza en MongoDB Atlas
- Para probar el proyecto, solicitar las credenciales de conexión o configurar una base de datos propia en MongoDB Atlas
