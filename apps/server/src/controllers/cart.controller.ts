import { and, cartItems, carts, db, eq } from "@bytemart/database";
import type { Request, Response } from "express";
import { z } from "zod";
import { handleError } from "../utils";
import ApiError from "../utils/api-error";

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
});

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await db.query.carts.findFirst({
      where: eq(carts.customer_id, req.user.id),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw ApiError.notFound("Cart not found");
    }

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const validatedData = CartItemSchema.parse(req.body);

    let cart = await db.query.carts.findFirst({
      where: eq(carts.customer_id, req.user.id),
    });

    if (!cart) {
      // will only return the first inserted row id
      const [result] = await db
        .insert(carts)
        .values({
          customer_id: req.user.id,
        })
        .$returningId();

      if (!result) {
        throw ApiError.badRequest("Failed to create cart");
      }

      const cartId = result.id;
      cart = await db.query.carts.findFirst({
        where: eq(carts.id, cartId),
      });

      if (!cart) {
        throw ApiError.badRequest("Failed to retrieve created cart");
      }
    }

    await db.insert(cartItems).values({
      cart_id: cart.id,
      product_id: validatedData.productId,
      quantity: validatedData.quantity,
    });

    const newItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cart_id, cart.id),
        eq(cartItems.product_id, validatedData.productId)
      ),
      with: {
        product: true,
      },
    });

    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const validatedData = CartItemSchema.parse(req.body);

    await db
      .update(cartItems)
      .set({
        quantity: validatedData.quantity,
      })
      .where(eq(cartItems.id, req.params.id as string));

    res.json({
      success: true,
      message: "Cart item updated successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    await db.delete(cartItems).where(eq(cartItems.id, req.params.id as string));

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    handleError(error, res);
  }
};
