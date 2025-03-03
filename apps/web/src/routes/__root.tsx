import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import type { AuthContextType } from "@/hooks/use-auth";
import {
	Outlet,
	createRootRouteWithContext,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
	auth: AuthContextType;
}>()({
	beforeLoad: ({ context, location }) => {
		const publicRoutes = [
			"/",
			"/signin",
			"/signup",
			"explore",
			"/cart",
			"wishlist",
		];
		if (!publicRoutes.includes(location.pathname)) {
			if (!context.auth.isAuthenticated) {
				throw redirect({
					to: "/signin",
					search: {
						redirect: location.pathname,
					},
				});
			}
		}
	},
	component: () => (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Toaster />
			<TanStackRouterDevtools />
		</>
	),
});
