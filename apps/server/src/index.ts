import { checkDatabaseConnection } from "@bytemart/database";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import express from "express";
import { NODE_ENV, PORT, UPLOADTHING_TOKEN } from "./config";
import authRoute from "./routes/auth.route";
import cartRoute from "./routes/cart.route";
import productRoute from "./routes/product.route";
import wishlistRoute from "./routes/wishlist.route";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./config/uploadthing";
import { authMiddleware } from "./middlewares/auth.middleware";
import categoryRoute from "./routes/category.route";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	"/api/uploadthing",
	// authMiddleware,
	createRouteHandler({
		router: uploadRouter,
		config: {
			token: UPLOADTHING_TOKEN,
			isDev: NODE_ENV === "development",
		},
	}),
);

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello World" });
});

app.use("/v1/auth", authRoute);
app.use("/v1/cart", cartRoute);
app.use("/v1/wishlist", wishlistRoute);
app.use("/v1/product", productRoute);
app.use("/v1/category", categoryRoute);

app.listen(PORT, () => {
	checkDatabaseConnection();
	console.log(`Server is running on http://localhost:${PORT}`);
});
