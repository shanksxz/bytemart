import { Router } from "express";
import {
	addToWishlist,
	getWishlist,
	removeFromWishlist,
} from "../controllers/wishlist.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getWishlist);
router.post("/items", addToWishlist);
router.delete("/items/:id", removeFromWishlist);

export default router;
