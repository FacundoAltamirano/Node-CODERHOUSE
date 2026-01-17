import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
  res.json(await manager.getProducts());
});

router.get("/:pid", async (req, res) => {
  const product = await manager.getProductById(req.params.pid);
  product ? res.json(product) : res.status(404).json({ error: "Not found" });
});

router.post("/", async (req, res) => {
  const product = await manager.addProduct(req.body);
  res.status(201).json(product);
});

router.put("/:pid", async (req, res) => {
  const updated = await manager.updateProduct(req.params.pid, req.body);
  updated ? res.json(updated) : res.status(404).json({ error: "Not found" });
});

router.delete("/:pid", async (req, res) => {
  await manager.deleteProduct(req.params.pid);
  res.json({ status: "deleted" });
});

export default router;
