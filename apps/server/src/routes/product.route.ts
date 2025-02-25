import { Router } from "express";
import {
	createCategory,
	createProduct,
	deleteProduct,
	getCategories,
	getProduct,
	getProducts,
	updateProduct,
} from "../controllers/product.controller";
import {
	adminMiddleware,
	authMiddleware,
} from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

router.get("/categories", getCategories);
router.post("/categories", authMiddleware, adminMiddleware, createCategory);

export default router;
