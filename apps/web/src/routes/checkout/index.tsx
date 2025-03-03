import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CreditCard, CheckCircle2, LockIcon, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout/")({
	component: CheckoutPage,
});

const steps = [
	{ id: "shipping", name: "Shipping" },
	{ id: "payment", name: "Payment" },
	{ id: "review", name: "Review" },
];

export default function CheckoutPage() {
	const [currentStep, setCurrentStep] = useState("shipping");
	const { items, subtotal, shipping, tax, total, clearCart } = useCartStore();

	// Redirect if cart is empty
	if (items.length === 0) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
				<p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
				<Button asChild>
					<Link to="/explore">Start Shopping</Link>
				</Button>
			</div>
		);
	}

	const handlePlaceOrder = () => {
		// Here you would typically:
		// 1. Validate all inputs
		// 2. Send order to backend
		// 3. Handle payment processing
		// 4. Show confirmation
		
		toast.success("Order placed successfully!");
		clearCart();
		// Redirect to order confirmation page
		// navigate("/order/confirmation");
	};

	const goToStep = (stepId: string) => {
		setCurrentStep(stepId);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Checkout</h1>

			{/* Checkout Progress */}
			<div className="mb-8">
				<div className="flex items-center justify-between max-w-3xl mx-auto">
					{steps.map((step, index) => (
						<div key={step.id} className="flex flex-col items-center">
							<div className="flex items-center">
								{currentStep === step.id ? (
									<div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
										{index + 1}
									</div>
								) : currentStep === steps[index + 1]?.id ||
									currentStep === steps[index + 2]?.id ? (
									<div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
										<CheckCircle2 className="h-6 w-6" />
									</div>
								) : (
									<div className="h-10 w-10 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center">
										{index + 1}
									</div>
								)}

								{index < steps.length - 1 && (
									<div
										className={`w-24 sm:w-32 h-1 ${
											currentStep === steps[index + 1]?.id ||
											currentStep === steps[index + 2]?.id
												? "bg-primary"
												: "bg-gray-300"
										}`}
									/>
								)}
							</div>
							<span className="mt-2 text-sm font-medium">{step.name}</span>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Checkout Form */}
				<div className="lg:col-span-2">
					{/* Shipping Step */}
					{currentStep === "shipping" && (
						<Card>
							<CardHeader>
								<CardTitle>Shipping Information</CardTitle>
								<CardDescription>
									Enter your shipping address details
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="first-name">First Name</Label>
										<Input id="first-name" placeholder="John" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="last-name">Last Name</Label>
										<Input id="last-name" placeholder="Doe" />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										placeholder="john.doe@example.com"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input id="phone" type="tel" placeholder="(123) 456-7890" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="address">Street Address</Label>
									<Input id="address" placeholder="123 Main St" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="address2">
										Apartment, suite, etc. (optional)
									</Label>
									<Input id="address2" placeholder="Apt 4B" />
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<div className="space-y-2">
										<Label htmlFor="city">City</Label>
										<Input id="city" placeholder="New York" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="state">State</Label>
										<Select>
											<SelectTrigger id="state">
												<SelectValue placeholder="Select state" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="ny">New York</SelectItem>
												<SelectItem value="ca">California</SelectItem>
												<SelectItem value="tx">Texas</SelectItem>
												<SelectItem value="fl">Florida</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="zip">ZIP Code</Label>
										<Input id="zip" placeholder="10001" />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="country">Country</Label>
									<Select defaultValue="us">
										<SelectTrigger id="country">
											<SelectValue placeholder="Select country" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="us">United States</SelectItem>
											<SelectItem value="ca">Canada</SelectItem>
											<SelectItem value="uk">United Kingdom</SelectItem>
											<SelectItem value="au">Australia</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox id="save-address" />
									<Label htmlFor="save-address">
										Save this address for future orders
									</Label>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline" asChild>
									<Link to="/cart">Back to Cart</Link>
								</Button>
								<Button onClick={() => goToStep("payment")}>
									Continue to Payment
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					)}

					{currentStep === "payment" && (
						<Card>
							<CardHeader>
								<CardTitle>Payment Method</CardTitle>
								<CardDescription>Choose how you want to pay</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<RadioGroup defaultValue="credit-card">
									<div className="flex items-center space-x-2 border rounded-lg p-4">
										<RadioGroupItem value="credit-card" id="credit-card" />
										<Label
											htmlFor="credit-card"
											className="flex-1 cursor-pointer"
										>
											<div className="flex items-center">
												<CreditCard className="mr-2 h-5 w-5" />
												<span>Credit / Debit Card</span>
											</div>
										</Label>
									</div>

									<div className="flex items-center space-x-2 border rounded-lg p-4">
										<RadioGroupItem value="paypal" id="paypal" />
										<Label htmlFor="paypal" className="flex-1 cursor-pointer">
											<div className="flex items-center">
												<span className="font-bold text-blue-600 mr-2">
													Pay
												</span>
												<span className="font-bold text-blue-800">Pal</span>
											</div>
										</Label>
									</div>
								</RadioGroup>

								<div className="space-y-4 border rounded-lg p-4">
									<div className="space-y-2">
										<Label htmlFor="card-number">Card Number</Label>
										<Input id="card-number" placeholder="1234 5678 9012 3456" />
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="expiry">Expiration Date</Label>
											<Input id="expiry" placeholder="MM/YY" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="cvc">CVC</Label>
											<Input id="cvc" placeholder="123" />
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="name-on-card">Name on Card</Label>
										<Input id="name-on-card" placeholder="John Doe" />
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox id="save-payment" />
									<Label htmlFor="save-payment">
										Save this payment method for future orders
									</Label>
								</div>

								<div className="flex items-center text-sm text-gray-500">
									<LockIcon className="h-4 w-4 mr-2" />
									<span>Your payment information is secure and encrypted</span>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline" onClick={() => goToStep("shipping")}>
									Back to Shipping
								</Button>
								<Button onClick={() => goToStep("review")}>
									Continue to Review
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					)}

					{currentStep === "review" && (
						<Card>
							<CardHeader>
								<CardTitle>Review Your Order</CardTitle>
								<CardDescription>
									Please review your order details before placing your order
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="font-semibold mb-2">Shipping Address</h3>
									<div className="border rounded-lg p-4 text-sm">
										<p className="font-medium">John Doe</p>
										<p>123 Main St, Apt 4B</p>
										<p>New York, NY 10001</p>
										<p>United States</p>
										<p className="mt-2">john.doe@example.com</p>
										<p>(123) 456-7890</p>
									</div>
								</div>

								<div>
									<h3 className="font-semibold mb-2">Payment Method</h3>
									<div className="border rounded-lg p-4 text-sm">
										<div className="flex items-center">
											<CreditCard className="mr-2 h-5 w-5" />
											<span>Credit Card ending in 3456</span>
										</div>
									</div>
								</div>

								<div>
									<h3 className="font-semibold mb-2">Order Items</h3>
									<div className="border rounded-lg divide-y">
										{items.map((item) => (
											<div key={item.id} className="flex items-center p-4">
												<div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border">
													<img
														src={item.imageUrl}
														alt={item.name}
														className="object-cover"
													/>
												</div>
												<div className="ml-4 flex-1">
													<h4 className="font-medium">{item.name}</h4>
													<p className="text-sm text-gray-500">
														Qty: {item.quantity}
													</p>
												</div>
												<div className="font-medium">
													Rs {(item.price * item.quantity).toFixed(2)}
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox id="terms" />
									<Label htmlFor="terms" className="text-sm">
										I agree to the{" "}
										<Link to="/terms" className="text-primary hover:underline">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link
											to="/privacy"
											className="text-primary hover:underline"
										>
											Privacy Policy
										</Link>
									</Label>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline" onClick={() => goToStep("payment")}>
									Back to Payment
								</Button>
								<Button 
									className="w-full mt-4" 
									size="lg"
									onClick={handlePlaceOrder}
								>
									Place Order
								</Button>
							</CardFooter>
						</Card>
					)}
				</div>

				<div className="lg:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Order Items */}
							<div className="space-y-4">
								{items.map((item) => (
									<div key={item.id} className="flex items-center">
										<div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border">
											<img
												src={item.imageUrl}
												alt={item.name}
												className="object-cover"
											/>
										</div>
										<div className="ml-4 flex-1">
											<h4 className="font-medium text-sm">{item.name}</h4>
											<p className="text-xs text-gray-500">
												Qty: {item.quantity}
											</p>
										</div>
										<div className="font-medium text-sm">
											Rs {(item.price * item.quantity).toFixed(2)}
										</div>
									</div>
								))}
							</div>

							<Separator />

							{/* Order Totals */}
							<div className="space-y-2 text-sm">
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
							</div>

							<Separator />

							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span>Rs {total.toFixed(2)}</span>
							</div>

							<div className="bg-gray-50 p-4 rounded-lg border text-sm mt-4">
								<p className="font-medium mb-2">Secure Checkout</p>
								<p className="text-gray-600">
									Your payment information is securely transmitted using 256-bit encryption.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
