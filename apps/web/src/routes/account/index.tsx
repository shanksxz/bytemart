import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Package,
	MapPin,
	CreditCard,
	Bell,
	Settings,
	LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/account/")({
	component: AccountPage,
});

const user = {
	name: "John Doe",
	email: "john.doe@example.com",
	avatar: "/placeholder.svg?height=100&width=100",
};

const orders = [
	{ id: "ORD001", date: "2023-05-15", total: 299.99, status: "Delivered" },
	{ id: "ORD002", date: "2023-06-22", total: 149.5, status: "Shipped" },
	{ id: "ORD003", date: "2023-07-10", total: 79.99, status: "Processing" },
];

const addresses = [
	{
		id: 1,
		type: "Home",
		address: "123 Main St, Apt 4B, New York, NY 10001, United States",
		isDefault: true,
	},
	{
		id: 2,
		type: "Work",
		address:
			"456 Business Ave, Suite 200, San Francisco, CA 94105, United States",
		isDefault: false,
	},
];

const paymentMethods = [
	{ id: 1, type: "Visa", last4: "4242", expiry: "12/24", isDefault: true },
	{
		id: 2,
		type: "Mastercard",
		last4: "5555",
		expiry: "09/25",
		isDefault: false,
	},
];

export default function AccountPage() {
	const [activeTab, setActiveTab] = useState("overview");
	const { user } = useAuth();
	if (!user) return null;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Sidebar */}
				<aside className="w-full md:w-1/4">
					<Card>
						<CardHeader>
							<div className="flex items-center space-x-4">
								<Avatar className="h-12 w-12">
									<AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
								</Avatar>
								<div>
									<CardTitle>
										{user.firstName} {user.lastName}
									</CardTitle>
									<CardDescription>{user.email}</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<nav className="space-y-2">
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setActiveTab("overview")}
								>
									<Package className="mr-2 h-4 w-4" />
									Overview
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setActiveTab("orders")}
								>
									<Package className="mr-2 h-4 w-4" />
									Orders
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setActiveTab("addresses")}
								>
									<MapPin className="mr-2 h-4 w-4" />
									Addresses
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setActiveTab("payment")}
								>
									<CreditCard className="mr-2 h-4 w-4" />
									Payment Methods
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setActiveTab("notifications")}
								>
									<Bell className="mr-2 h-4 w-4" />
									Notifications
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setActiveTab("settings")}
								>
									<Settings className="mr-2 h-4 w-4" />
									Account Settings
								</Button>
							</nav>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full">
								<LogOut className="mr-2 h-4 w-4" />
								Log out
							</Button>
						</CardFooter>
					</Card>
				</aside>

				{/* Main Content */}
				<main className="flex-1">
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="mb-4">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="orders">Orders</TabsTrigger>
							<TabsTrigger value="addresses">Addresses</TabsTrigger>
							<TabsTrigger value="payment">Payment</TabsTrigger>
							<TabsTrigger value="notifications">Notifications</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="overview">
							<Card>
								<CardHeader>
									<CardTitle>Account Overview</CardTitle>
									<CardDescription>
										View a summary of your account activity and information.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<h3 className="font-semibold mb-2">Recent Orders</h3>
										<div className="space-y-2">
											{orders.slice(0, 3).map((order) => (
												<div
													key={order.id}
													className="flex justify-between items-center"
												>
													<span>{order.id}</span>
													<span>
														{new Date(order.date).toLocaleDateString()}
													</span>
													<Badge>{order.status}</Badge>
												</div>
											))}
										</div>
										<Button
											variant="link"
											className="mt-2 p-0"
											onClick={() => setActiveTab("orders")}
										>
											View all orders
										</Button>
									</div>
									<Separator />
									<div>
										<h3 className="font-semibold mb-2">Default Address</h3>
										<p className="text-sm text-gray-600">
											{addresses.find((addr) => addr.isDefault)?.address}
										</p>
										<Button
											variant="link"
											className="mt-2 p-0"
											onClick={() => setActiveTab("addresses")}
										>
											Manage addresses
										</Button>
									</div>
									<Separator />
									<div>
										<h3 className="font-semibold mb-2">
											Default Payment Method
										</h3>
										<p className="text-sm text-gray-600">
											{paymentMethods.find((method) => method.isDefault)?.type}{" "}
											ending in{" "}
											{paymentMethods.find((method) => method.isDefault)?.last4}
										</p>
										<Button
											variant="link"
											className="mt-2 p-0"
											onClick={() => setActiveTab("payment")}
										>
											Manage payment methods
										</Button>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="orders">
							<Card>
								<CardHeader>
									<CardTitle>Order History</CardTitle>
									<CardDescription>
										View and manage your past orders.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{orders.map((order) => (
											<div
												key={order.id}
												className="flex items-center justify-between border-b pb-4 last:border-0"
											>
												<div>
													<p className="font-medium">{order.id}</p>
													<p className="text-sm text-gray-500">
														{new Date(order.date).toLocaleDateString()}
													</p>
												</div>
												<div className="text-right">
													<p className="font-medium">
														${order.total.toFixed(2)}
													</p>
													<Badge>{order.status}</Badge>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="addresses">
							<Card>
								<CardHeader>
									<CardTitle>Addresses</CardTitle>
									<CardDescription>
										Manage your shipping addresses.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{addresses.map((address) => (
											<div key={address.id} className="border rounded-lg p-4">
												<div className="flex justify-between items-start mb-2">
													<div>
														<h3 className="font-semibold">{address.type}</h3>
														{address.isDefault && <Badge>Default</Badge>}
													</div>
													<Button variant="outline" size="sm">
														Edit
													</Button>
												</div>
												<p className="text-sm text-gray-600">
													{address.address}
												</p>
											</div>
										))}
									</div>
									<Button className="mt-4">Add New Address</Button>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="payment">
							<Card>
								<CardHeader>
									<CardTitle>Payment Methods</CardTitle>
									<CardDescription>
										Manage your payment methods.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{paymentMethods.map((method) => (
											<div key={method.id} className="border rounded-lg p-4">
												<div className="flex justify-between items-start mb-2">
													<div>
														<h3 className="font-semibold">
															{method.type} ending in {method.last4}
														</h3>
														{method.isDefault && <Badge>Default</Badge>}
													</div>
													<Button variant="outline" size="sm">
														Edit
													</Button>
												</div>
												<p className="text-sm text-gray-600">
													Expires {method.expiry}
												</p>
											</div>
										))}
									</div>
									<Button className="mt-4">Add New Payment Method</Button>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="notifications">
							<Card>
								<CardHeader>
									<CardTitle>Notification Preferences</CardTitle>
									<CardDescription>
										Manage your notification settings.
									</CardDescription>
								</CardHeader>
								<CardContent>
									{/* Add notification preferences UI here */}
									<p>Notification preferences content (to be implemented)</p>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="settings">
							<Card>
								<CardHeader>
									<CardTitle>Account Settings</CardTitle>
									<CardDescription>
										Manage your account settings and preferences.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input id="name" defaultValue={user.name} />
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												defaultValue={user.email}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="password">New Password</Label>
											<Input id="password" type="password" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="confirm-password">
												Confirm New Password
											</Label>
											<Input id="confirm-password" type="password" />
										</div>
										<Button type="submit">Save Changes</Button>
									</form>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	);
}
