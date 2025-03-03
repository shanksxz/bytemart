import { createFileRoute } from "@tanstack/react-router";
import { useCartStore } from '@/store/cart';
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/cart/")({
	component: CartPage,
});


export default function CartPage() {
	const { items, subtotal, shipping, tax, total, updateQuantity, removeItem } = useCartStore();
	const hasItems = items.length > 0;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

			{hasItems ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg border">
							<div className="p-6">
								<h2 className="text-xl font-semibold mb-4">
									Cart Items ({items.length})
								</h2>

								<div className="space-y-6">
									{items.map((item) => (
										<div
											key={item.id}
											className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
										>
											<div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-md overflow-hidden border">
												<img
													src={item.imageUrl}
													alt={item.name}
													className="object-cover"
												/>
											</div>

											<div className="flex-1 flex flex-col">
												<div className="flex justify-between">
													<Link
														to={`/product/${item.productId}`}
														className="hover:underline"
													>
														<h3 className="font-semibold">{item.name}</h3>
													</Link>
													<span className="font-semibold">
														Rs {(item.price * item.quantity).toFixed(2)}
													</span>
												</div>

												<p className="text-sm text-gray-500 mt-1">
													Rs {item.price.toFixed(2)} each
												</p>

												<div className="flex flex-wrap items-center justify-between mt-auto pt-4">
													<div className="flex items-center border rounded-md">
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 rounded-none"
															disabled={item.quantity <= 1}
															onClick={() => updateQuantity(item.id, item.quantity - 1)}
														>
															<Minus className="h-3 w-3" />
														</Button>
														<span className="w-8 text-center">
															{item.quantity}
														</span>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 rounded-none"
															disabled={item.quantity >= item.maxQuantity}
															onClick={() => updateQuantity(item.id, item.quantity + 1)}
														>
															<Plus className="h-3 w-3" />
														</Button>
													</div>

													<Button
														variant="ghost"
														size="sm"
														className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
														onClick={() => removeItem(item.id)}
													>
														<Trash2 className="h-4 w-4 mr-1" />
														<span>Remove</span>
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg border p-6 sticky top-20">
							<h2 className="text-xl font-semibold mb-4">Order Summary</h2>

							<div className="space-y-4">
								<div className="flex justify-between">
									<span>Subtotal</span>
									<span>Rs {subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span>Shipping</span>
									<span>Rs {shipping.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span>Tax</span>
									<span>Rs {tax.toFixed(2)}</span>
								</div>

								<Separator />

								<div className="flex justify-between font-semibold text-lg">
									<span>Total</span>
									<span>Rs {total.toFixed(2)}</span>
								</div>

								<div className="pt-4">
									<div className="flex gap-2 mb-4">
										<Input placeholder="Discount code" />
										<Button variant="outline">Apply</Button>
									</div>

									<Button className="w-full" size="lg" asChild>
										<Link to="/checkout">Proceed to Checkout</Link>
									</Button>

									<Button variant="outline" className="w-full mt-2" asChild>
										<Link to="/explore">Continue Shopping</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="text-center py-12 border rounded-lg">
					<div className="max-w-md mx-auto">
						<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
						<p className="text-gray-600 mb-8">
							Looks like you haven't added any products to your cart yet.
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
