import { Router } from "express";
import {
	addToCart,
	getCart,
	removeFromCart,
	updateCartItem,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/items", addToCart);
router.put("/items/:id", updateCartItem);
router.delete("/items/:id", removeFromCart);

export default router;
