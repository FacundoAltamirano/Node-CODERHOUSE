Entrega N°1 – Backend Node.js | CoderHouse
Alumno: Facundo Altamirano

Descripción
Este proyecto corresponde a la Primera **Entrega del curso de Backend con Node.js de CoderHouse**.

El objetivo es desarrollar una API REST utilizando **Node.js y Express**, que permita gestionar **productos** y **carritos de compra**, con persistencia de datos mediante el sistema de archivos (JSON).

Toda la interacción con la API se realiza a través de herramientas como **Postman**, sin implementación visual.

---

Tecnologías utilizadas

- Node.js
- Express
- File System (fs)
- dotenv
- Nodemon (entorno de desarrollo)

---

Estructura del proyecto

src/
├─ app.js
├─ routes/
│ ├─ products.router.js
│ └─ carts.router.js
└─ managers/
├─ ProductManager.js
└─ CartManager.js

data/
├─ products.json
└─ carts.json

---

Endpoints disponibles

Productos (`/api/products`)

- `GET /` → Listar todos los productos
- `GET /:pid` → Obtener producto por ID
- `POST /` → Crear un nuevo producto
- `PUT /:pid` → Actualizar un producto
- `DELETE /:pid` → Eliminar un producto

Carritos (`/api/carts`)

- `POST /` → Crear un nuevo carrito
- `GET /:cid` → Listar productos del carrito
- `POST /:cid/product/:pid` → Agregar producto al carrito (incrementa cantidad si ya existe)

---

Configuración

El servidor escucha por defecto en el puerto **8080**, configurable mediante variables de entorno utilizando `dotenv`.

Ejemplo de archivo `.env`:

PORT=8080

---

Notas adicionales
Además del contenido del curso de CoderHouse, para el desarrollo de este proyecto se aplicaron **Buenas prácticas aprendidas en el curso**:

> **NodeJS: De Cero a Experto** – Fernando Herrera (Udemy)

Este curso se está realizando de forma paralela con el objetivo de reforzar conceptos fundamentales de Node.js, Express y arquitectura backend.

---

Observaciones

- No se incluye la carpeta `node_modules`
- No se realiza implementación visual
- Proyecto listo para ser probado mediante Postman
