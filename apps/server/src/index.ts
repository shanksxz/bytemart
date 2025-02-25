import { checkDatabaseConnection } from "@bytemart/database";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import express from "express";
import { PORT } from "./config";
import authRoute from "./routes/auth.route";
import cartRoute from "./routes/cart.route";
import productRoute from "./routes/product.route";
import wishlistRoute from "./routes/wishlist.route";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello World" });
});

app.use("/v1/auth", authRoute);
app.use("/v1/cart", cartRoute);
app.use("/v1/wishlist", wishlistRoute);
app.use("/v1/product", productRoute);

app.listen(PORT, () => {
	checkDatabaseConnection();
	console.log(`Server is running on http://localhost:${PORT}`);
});
