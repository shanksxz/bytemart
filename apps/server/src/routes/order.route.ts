import { Router } from "express";
import {
	createOrder,
	getOrder,
	getOrders,
	updateOrderStatus,
} from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);

export default router;
