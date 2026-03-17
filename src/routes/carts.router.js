import { Router } from "express";
import Cart from "../models/Cart.js";

const router = Router();

// POST / - Crear carrito
router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create({ products: [] });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /:cid - Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate(
      "products.product",
    );
    cart ? res.json(cart) : res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === req.params.pid,
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:cid/products/:pid - Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.pid,
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /:cid - Actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { products: req.body.products },
      { new: true },
    );
    cart ? res.json(cart) : res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /:cid/products/:pid - Actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const product = cart.products.find(
      (p) => p.product.toString() === req.params.pid,
    );

    if (!product)
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });

    product.quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:cid - Vaciar carrito
router.delete("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { products: [] },
      { new: true },
    );
    cart ? res.json(cart) : res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
