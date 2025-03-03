import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// This would typically come from an API or database
const products = [
	{
		id: "2",
		name: "Premium 4K OLED TV",
		price: 1299.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "TV & Home Theater",
		badge: "Premium",
		rating: 4.7,
		reviews: 86,
	},
	{
		id: "3",
		name: "Smart TV Sound Bar",
		price: 249.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "TV & Home Theater",
		badge: null,
		rating: 4.5,
		reviews: 124,
	},
	{
		id: "4",
		name: "Wireless Subwoofer",
		price: 179.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "TV & Home Theater",
		badge: "Sale",
		rating: 4.3,
		reviews: 58,
	},
	{
		id: "5",
		name: "Universal Remote Control",
		price: 39.99,
		image: "/placeholder.svg?height=300&width=300",
		category: "TV & Home Theater",
		badge: null,
		rating: 4.1,
		reviews: 212,
	},
];

export function RelatedProducts({
	categoryId,
	currentProductId,
}: {
	categoryId: string;
	currentProductId: string;
}) {
	// Filter products by category and exclude current product
	const relatedProducts = products.filter(
		(product) =>
			product.category === categoryId && product.id !== currentProductId,
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{relatedProducts.map((product) => (
				<Card
					key={product.id}
					className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
				>
					<CardHeader className="p-0 relative">
						<Link to={`/product/${product.id}`}>
							<div className="relative h-48 w-full overflow-hidden">
								<img
									src={product.image || "/placeholder.svg"}
									alt={product.name}
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
						</Link>
						{product.badge && (
							<Badge className="absolute top-2 right-2">{product.badge}</Badge>
						)}
					</CardHeader>
					<CardContent className="pt-4">
						<div className="text-sm text-gray-500 mb-1">{product.category}</div>
						<Link to={`/product/${product.id}`} className="hover:underline">
							<CardTitle className="text-lg font-semibold">
								{product.name}
							</CardTitle>
						</Link>
						<div className="mt-2 font-bold text-lg">
							${product.price.toFixed(2)}
						</div>
						<div className="text-sm text-gray-500 mt-1">
							{product.rating} ★ ({product.reviews} reviews)
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline" size="sm" asChild>
							<Link to={`/product/${product.id}`}>View Details</Link>
						</Button>
						<Button size="sm">Add to Cart</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
