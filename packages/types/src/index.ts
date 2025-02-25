import { z } from "zod";

export const UserRoleEnum = {
	CUSTOMER: "customer",
	ADMIN: "admin",
} as const;

export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	phone: z.string().optional(),
	role: z.enum([UserRoleEnum.CUSTOMER, UserRoleEnum.ADMIN]),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const AddressSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	addressLine1: z.string(),
	addressLine2: z.string().optional(),
	city: z.string(),
	state: z.string(),
	postalCode: z.string(),
	country: z.string(),
	isDefault: z.boolean().default(false),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const ProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
	stockQuantity: z.number(),
	categoryId: z.string().optional(),
	imageUrl: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	parentId: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const OrderStatusEnum = {
	PENDING: "pending",
	PROCESSING: "processing",
	SHIPPED: "shipped",
	DELIVERED: "delivered",
	CANCELLED: "cancelled",
} as const;

export const OrderSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	status: z.enum([
		OrderStatusEnum.PENDING,
		OrderStatusEnum.PROCESSING,
		OrderStatusEnum.SHIPPED,
		OrderStatusEnum.DELIVERED,
		OrderStatusEnum.CANCELLED,
	]),
	total: z.number(),
	shippingAddressId: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const OrderItemSchema = z.object({
	id: z.string(),
	orderId: z.string(),
	productId: z.string(),
	quantity: z.number(),
	price: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CartSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CartItemSchema = z.object({
	id: z.string(),
	cartId: z.string(),
	productId: z.string(),
	quantity: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const ReviewSchema = z.object({
	id: z.string(),
	productId: z.string(),
	customerId: z.string(),
	rating: z.number().min(1).max(5),
	comment: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const SignupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	firstName: z.string(),
	lastName: z.string(),
	phone: z.string()
});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
	items: T[];
	total: number;
	page: number;
	limit: number;
}>;
