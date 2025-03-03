import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heart, Share2, Minus, Plus, Star, ChevronRight, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductReviews } from "@/features/products/components/product-reviews";
import { RelatedProducts } from "@/features/products/components/related-product";
import { useProductById } from "@/features/products/api/get-product-by-id";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$productId/")({
	component: ProductPage,
});

function ProductPage() {
	const { productId } = Route.useParams();
	const { data } = useProductById({
		productId,
	});
	const { addItem: addToCart, removeItem: removeFromCart, items: cartItems, updateQuantity } = useCartStore();
	const { toggleItem, items: wishlistItems } = useWishlistStore();
	
	if (!data?.data) return <div>Product not found</div>;
	const product = data.data;

	const cartItem = cartItems.find(item => item.productId === product.id);
	const isInWishlist = wishlistItems.some(item => item.id === product.id);

	const handleCartAction = () => {
		if (cartItem) {
			removeFromCart(cartItem.id);
			toast.success("Removed from cart");
		} else {
			addToCart({
				id: product.id,
				productId: product.id,
				name: product.name,
				price: Number(product.price),
				quantity: 1,
				maxQuantity: product.stock_quantity,
				imageUrl: product.image_url || "/placeholder.svg",
			});
			toast.success("Added to cart");
		}
	};

	const handleWishlistToggle = () => {
		toggleItem({
			id: product.id,
			productId: product.id,
			name: product.name,
			price: Number(product.price),
			imageUrl: product.image_url || "/placeholder.svg",
			category: product.category.name,
			inStock: product.stock_quantity > 0,
		});
		toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
	};

	const handleQuantityChange = (increment: boolean) => {
		if (!cartItem) return;
		const newQuantity = increment ? cartItem.quantity + 1 : cartItem.quantity - 1;
		updateQuantity(cartItem.id, newQuantity);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="/explore">Products</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink
							href={`/explore?category=${encodeURIComponent(product.category.name)}`}
						>
							{product.category.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<ChevronRight className="h-4 w-4" />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<span className="truncate max-w-[200px] inline-block">
							{product.name}
						</span>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
				{/* Product Images */}
				<div>
					<Suspense
						fallback={<Skeleton className="w-full aspect-square rounded-lg" />}
					>
						<div className="space-y-4">
							<div className="relative aspect-square overflow-hidden rounded-lg border">
								<img
									src={product.image_url || "/placeholder.svg"}
									alt={product.name}
									className="object-cover"
								/>
							</div>
						</div>
					</Suspense>
				</div>

				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<div className="flex items-center mt-2">
							{product.rating && (
								<div className="flex items-center">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${
												i < Math.floor(Number.parseFloat(product.rating || "0"))
													? "text-yellow-400 fill-yellow-400"
													: i < Number.parseFloat(product.rating || "0")
														? "text-yellow-400 fill-yellow-400"
														: "text-gray-300"
											}`}
										/>
									))}
									<span className="ml-2 text-sm text-gray-600">
										{product.rating} ({product.reviews || 0} reviews)
									</span>
								</div>
							)}
						</div>
					</div>

					<div className="text-3xl font-bold">
						Rs {Number.parseFloat(product.price).toFixed(2)}
					</div>

					<p className="text-gray-700">{product.description}</p>

					<div className="space-y-4">
						<div>
							<h3 className="text-sm font-medium mb-2">Quantity</h3>
							<div className="flex items-center border rounded-md w-32">
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-none"
									disabled={!cartItem || cartItem.quantity <= 1}
									onClick={() => handleQuantityChange(false)}
								>
									<Minus className="h-4 w-4" />
								</Button>
								<div className="flex-1 text-center">
									{cartItem?.quantity || 1}
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-none"
									disabled={!cartItem || cartItem.quantity >= cartItem.maxQuantity}
									onClick={() => handleQuantityChange(true)}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<p className="text-sm text-gray-500 mt-1">
								{product.stock_quantity} items available
							</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4">
						<Button 
							size="lg" 
							className="flex-1"
							variant={cartItem ? "destructive" : "default"}
							onClick={handleCartAction}
						>
							{cartItem ? (
								<>
									<Minus className="h-5 w-5 mr-2" />
									Remove from Cart
								</>
							) : (
								<>
									<ShoppingCart className="h-5 w-5 mr-2" />
									Add to Cart
								</>
							)}
						</Button>
						<Button 
							size="lg" 
							variant="outline" 
							className={`sm:flex-none ${isInWishlist ? 'text-red-500' : ''}`}
							onClick={handleWishlistToggle}
						>
							<Heart 
								className="h-5 w-5" 
								fill={isInWishlist ? "currentColor" : "none"} 
							/>
							<span className="sr-only">Toggle Wishlist</span>
						</Button>
						<Button size="lg" variant="outline" className="sm:flex-none">
							<Share2 className="h-5 w-5" />
							<span className="sr-only">Share</span>
						</Button>
					</div>
				</div>
			</div>

			<Tabs defaultValue="details" className="mb-12 p-1">
				<TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
					<TabsTrigger
						value="details"
						className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
					>
						Details
					</TabsTrigger>
					<TabsTrigger
						value="reviews"
						className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
					>
						Reviews
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="pt-6">
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">Product Details</h3>
						{product.description.split("\n").map((line, index) => (
							<p key={index} className="text-gray-700">
								{line}
							</p>
						))}
					</div>
				</TabsContent>

				<TabsContent value="reviews" className="pt-6">
					<ProductReviews
						productId={product.id}
						rating={product.rating ? Number.parseFloat(product.rating) : 0}
						reviewCount={product.reviews || 0}
					/>
				</TabsContent>
			</Tabs>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Related Products</h2>
				<RelatedProducts
					categoryId={product.category_id || ""}
					currentProductId={product.id}
				/>
			</div>
		</div>
	);
}

export default ProductPage;


//TODO: implement image crousal later
// function ProductImageGallery({
// 	images,
// 	name,
// }: { images: string[]; name: string }) {
// 	return (
// 		<div className="space-y-4">
// 			<div className="relative aspect-square overflow-hidden rounded-lg border">
// 				<img
// 					src={images[0] || "/placeholder.svg"}
// 					alt={name}
// 					className="object-cover"
// 				/>
// 			</div>
// 			<div className="grid grid-cols-4 gap-4">
// 				{images.map((image, index) => (
// 					<div
// 						key={index}
// 						className="relative aspect-square overflow-hidden rounded-lg border"
// 					>
// 						<img
// 							src={image || "/placeholder.svg"}
// 							alt={`${name} - Image ${index + 1}`}
// 							className="object-cover"
// 						/>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
