import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthContextProvider, useAuth } from "./hooks/use-auth";
import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
	return (
		<AuthContextProvider>
			<InnerApp />
		</AuthContextProvider>
	);
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>,
	);
}
