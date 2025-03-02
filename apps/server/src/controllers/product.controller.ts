import { categories, db, eq, products } from "@bytemart/database";
import { ProductSchema, CategorySchema } from "@bytemart/types";
import type { Request, Response } from "express";
import { handleError } from "../utils";
import ApiError from "../utils/api-error";

export const createProduct = async (req: Request, res: Response) => {
	try {
		if (req.user.role !== "admin") {
			throw ApiError.forbidden("Only admins can create products");
		}

		const validatedData = ProductSchema.parse(req.body);


		const product = await db.insert(products).values({
			name: validatedData.name,
			description: validatedData.description || "",
			price: String(validatedData.price) || "",
			stock_quantity: validatedData.stockQuantity,
			category_id: validatedData.categoryId || null,
			image_url: validatedData.imageUrl || "",
		});

		res.status(201).json({
			success: true,
			data: product,
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const allProducts = await db.query.products.findMany({
			with: {
				category: true,
			},
		});

		res.json({
			success: true,
			data: allProducts,
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const getProduct = async (req: Request, res: Response) => {
	try {
		const product = await db.query.products.findFirst({
			where: eq(products.id, req.params.id as string),
			with: {
				category: true,
			},
		});

		if (!product) {
			throw ApiError.notFound("Product not found");
		}

		res.json({
			success: true,
			data: product,
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		if (req.user.role !== "admin") {
			throw ApiError.forbidden("Only admins can update products");
		}

		const validatedData = ProductSchema.partial().parse(req.body);

		await db
			.update(products)
			.set({
				name: validatedData.name,
				description: validatedData.description,
				price: validatedData.price?.toString(),
				stock_quantity: validatedData.stockQuantity,
				category_id: validatedData.categoryId,
				image_url: validatedData.imageUrl,
			})
			.where(eq(products.id, req.params.id as string));

		res.json({
			success: true,
			message: "Product updated successfully",
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		if (req.user.role !== "admin") {
			throw ApiError.forbidden("Only admins can delete products");
		}

		await db.delete(products).where(eq(products.id, req.params.id as string));

		res.json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		handleError(error, res);
	}
};

