import { db, eq, wishlistItems, wishlists } from "@bytemart/database";
import type { Request, Response } from "express";
import { z } from "zod";
import { handleError } from "../utils";
import ApiError from "../utils/api-error";

const WishlistItemSchema = z.object({
	productId: z.string(),
});

export const getWishlist = async (req: Request, res: Response) => {
	try {
		const wishlist = await db.query.wishlists.findFirst({
			where: eq(wishlists.customer_id, req.user.id),
			with: {
				items: {
					with: {
						product: true,
					},
				},
			},
		});

		if (!wishlist) {
			throw ApiError.notFound("Wishlist not found");
		}

		res.json({
			success: true,
			data: wishlist,
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const addToWishlist = async (req: Request, res: Response) => {
	try {
		const validatedData = WishlistItemSchema.parse(req.body);

		let wishlist = await db.query.wishlists.findFirst({
			where: eq(wishlists.customer_id, req.user.id),
		});

		if (!wishlist) {
			const [newWishlist] = await db
				.insert(wishlists)
				.values({
					customer_id: req.user.id,
				})
				.$returningId();
			wishlist = newWishlist[0];
		}

		const wishlistItem = await db.insert(wishlistItems).values({
			wishlist_id: wishlist.id,
			product_id: validatedData.productId,
		});

		res.status(201).json({
			success: true,
			data: wishlistItem,
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const removeFromWishlist = async (req: Request, res: Response) => {
	try {
		await db.delete(wishlistItems).where(eq(wishlistItems.id, req.params.id));

		res.json({
			success: true,
			message: "Item removed from wishlist",
		});
	} catch (error) {
		handleError(error, res);
	}
};
