import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
