import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET / con paginación, filtros y ordenamiento
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Filtro por categoría o disponibilidad
    const filter = {};
    if (query) {
      // Si query es "true" o "false" filtramos por status, sino por categoría
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = { $regex: query, $options: "i" };
      }
    }

    // Ordenamiento por precio
    const sortOption =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
      lean: true,
    };

    const result = await Product.paginate(filter, options);

    // Construir links de paginación
    const baseUrl = `/api/products?limit=${limit}${query ? `&query=${query}` : ""}${sort ? `&sort=${sort}` : ""}`;

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `${baseUrl}&page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `${baseUrl}&page=${result.nextPage}`
        : null,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /:pid
router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    product ? res.json(product) : res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const result = await Product.paginate(
      {},
      { limit: 10, page: 1, lean: true },
    );
    req.io.emit("productListUpdated", result.docs);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /:pid
router.put("/:pid", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.pid, req.body, {
      new: true,
    });
    updated ? res.json(updated) : res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:pid
router.delete("/:pid", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid);
    const result = await Product.paginate(
      {},
      { limit: 10, page: 1, lean: true },
    );
    req.io.emit("productListUpdated", result.docs);
    res.json({ status: "deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
