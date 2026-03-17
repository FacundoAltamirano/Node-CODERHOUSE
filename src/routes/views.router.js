import { Router } from "express";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const router = Router();

// Home - lista de productos con paginación
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = { $regex: query, $options: "i" };
      }
    }

    const sortOption =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const result = await Product.paginate(filter, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
      lean: true,
    });

    const baseUrl = `/?limit=${limit}${query ? `&query=${query}` : ""}${sort ? `&sort=${sort}` : ""}`;

    res.render("home", {
      products: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `${baseUrl}&page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `${baseUrl}&page=${result.nextPage}`
        : null,
      query: query || "",
      sort: sort || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Vista detalle de producto
router.get("/products/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    product
      ? res.render("productDetail", { product })
      : res.status(404).render("404");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Vista carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid)
      .populate("products.product")
      .lean();
    cart ? res.render("cart", { cart }) : res.status(404).render("404");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Real time products
router.get("/realtimeproducts", async (req, res) => {
  try {
    const result = await Product.paginate(
      {},
      { limit: 10, page: 1, lean: true },
    );
    res.render("realTimeProducts", { products: result.docs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
