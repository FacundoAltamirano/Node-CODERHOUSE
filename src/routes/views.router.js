import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
