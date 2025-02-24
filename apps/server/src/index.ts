import type { Request, Response } from "express";
import express from "express";
import { PORT } from "./config";
import { checkDatabaseConnection } from "@bytemart/database";

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
	checkDatabaseConnection();
	console.log(`Server is running on http://localhost:${PORT}`);
});
