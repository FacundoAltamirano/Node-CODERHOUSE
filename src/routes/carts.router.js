import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const manager = new CartManager("./data/carts.json");

router.post("/", async (req, res) => {
  res.status(201).json(await manager.createCart());
});

router.get("/:cid", async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  cart ? res.json(cart) : res.status(404).json({ error: "Not found" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await manager.addProductToCart(req.params.cid, req.params.pid);
  cart ? res.json(cart) : res.status(404).json({ error: "Not found" });
});

export default router;
