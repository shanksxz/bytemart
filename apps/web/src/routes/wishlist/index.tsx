import { createFileRoute } from "@tanstack/react-router";
import { useWishlistStore } from '@/store/wishlist';
import { useCartStore } from '@/store/cart';
import { WishlistItem } from '@bytemart/types';

export const Route = createFileRoute("/wishlist/")({
	component: WishlistPage,
});

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Trash2, ShoppingCart } from "lucide-react";

// This would typically come from an API or database
const wishlistItems = [
	{
		id: "1",
		name: "Ultra HD Smart TV",
		price: 899.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "TV & Home Theater",
		inStock: true,
	},
	{
		id: "2",
		name: "Pro Wireless Headphones",
		price: 249.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "Audio",
		inStock: true,
	},
	{
		id: "3",
		name: "Gaming Laptop",
		price: 1299.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "Computers",
		inStock: false,
	},
];

export default function WishlistPage() {
	const { items, removeItem } = useWishlistStore();
	const { addItem: addToCart } = useCartStore();
	const hasItems = items.length > 0;

	const handleAddToCart = (item: WishlistItem) => {
		addToCart({
			id: item.id,
			productId: item.productId,
			name: item.name,
			price: item.price,
			quantity: 1,
			maxQuantity: 10, // You might want to get this from the API
			imageUrl: item.imageUrl,
		});
		removeItem(item.id); // Optionally remove from wishlist after adding to cart
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

			{hasItems ? (
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item) => (
							<Card key={item.id} className="overflow-hidden">
								<CardHeader className="p-0">
									<Link to={`/product/${item.productId}`}>
										<div className="relative h-48 w-full overflow-hidden">
											<img
												src={item.imageUrl}
												alt={item.name}
												className="object-cover hover:scale-105 transition-transform duration-300"
											/>
										</div>
									</Link>
								</CardHeader>
								<CardContent className="pt-4">
									<div className="text-sm text-gray-500 mb-1">
										{item.category}
									</div>
									<Link to={`/product/${item.productId}`} className="hover:underline">
										<h3 className="text-lg font-semibold">{item.name}</h3>
									</Link>
									<div className="mt-2 font-bold text-lg">
										${item.price.toFixed(2)}
									</div>
									<div className="mt-1 text-sm">
										{item.inStock ? (
											<span className="text-green-600">In Stock</span>
										) : (
											<span className="text-red-600">Out of Stock</span>
										)}
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button
										variant="outline"
										size="sm"
										className="text-red-600 hover:text-red-700 hover:bg-red-50"
										onClick={() => removeItem(item.id)}
									>
										<Trash2 className="h-4 w-4 mr-2" />
										Remove
									</Button>
									<Button 
										size="sm" 
										disabled={!item.inStock}
										onClick={() => handleAddToCart(item)}
									>
										<ShoppingCart className="h-4 w-4 mr-2" />
										Add to Cart
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>

					<div className="flex justify-between items-center border-t pt-6">
						<Button variant="outline" asChild>
							<Link to="/explore">Continue Shopping</Link>
						</Button>
						<Button>Add All to Cart</Button>
					</div>
				</div>
			) : (
				<div className="text-center py-12 border rounded-lg">
					<div className="max-w-md mx-auto">
						<h2 className="text-2xl font-semibold mb-4">
							Your wishlist is empty
						</h2>
						<p className="text-gray-600 mb-8">
							Items added to your wishlist will be saved here for you to revisit
							later.
						</p>
						<Button asChild>
							<Link to="/explore">Start Shopping</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
