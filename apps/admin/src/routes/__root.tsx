import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppHeader from "@/components/layout/app-header";
import { ThemeProvider } from "@/hooks/use-theme";
import { Separator } from "@/components/ui/separator";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
						<div className="flex h-14 w-full items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1.5" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<AppHeader />
						</div>
					</header>
					<main className="p-6">
						<Outlet />
					</main>
				</SidebarInset>
				<TanStackRouterDevtools />
			</SidebarProvider>
		</ThemeProvider>
	),
});
