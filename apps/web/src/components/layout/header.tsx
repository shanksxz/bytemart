import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Explore", href: "/explore" },
	{ name: "About", href: "/about" },
];

export function Header() {
	const { pathname } = useLocation();
	const { items: cartItems } = useCartStore();
	const { items: wishlistItems } = useWishlistStore();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex items-center">
						<Link to="/" className="text-xl font-bold">
							ByteMart
						</Link>
					</div>

					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`text-sm font-medium transition-colors hover:text-primary ${
									pathname === item.href
										? "text-primary"
										: "text-muted-foreground"
								}`}
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Action Icons */}
					<div className="flex items-center space-x-2">
						<Button variant="ghost" size="icon" asChild className="relative">
							<Link to="/wishlist" aria-label="Wishlist">
								<Heart className="h-5 w-5" />
								{wishlistItems.length > 0 && (
									<Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
										{wishlistItems.length}
									</Badge>
								)}
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild className="relative">
							<Link to="/cart" aria-label="Shopping cart">
								<ShoppingCart className="h-5 w-5" />
								{cartItems.length > 0 && (
									<Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
										{cartItems.length}
									</Badge>
								)}
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link to="/account" aria-label="Sign in">
								<User className="h-5 w-5" />
							</Link>
						</Button>

						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="md:hidden">
									<Menu className="h-5 w-5" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<div className="flex flex-col space-y-4 mt-8 p-2">
									{navigation.map((item) => (
										<SheetClose asChild key={item.name}>
											<Link
												to={item.href}
												className={`text-base font-medium transition-colors hover:text-primary ${
													pathname === item.href
														? "text-primary"
														: "text-muted-foreground"
												}`}
											>
												{item.name}
											</Link>
										</SheetClose>
									))}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
