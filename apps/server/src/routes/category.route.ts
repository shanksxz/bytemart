import express, { type Router } from "express";
import {
	createCategory,
	getCategories,
	updateCategory,
	deleteCategory,
	getParentCategories,
} from "../controllers/category.controller";
import {
	adminMiddleware,
	authMiddleware,
} from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.get("/", getCategories);
router.get("/parent", getParentCategories);
router.post("/", authMiddleware, adminMiddleware, createCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default router;
