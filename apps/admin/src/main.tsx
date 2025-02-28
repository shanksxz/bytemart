import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryCLient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryCLient}>
		<RouterProvider router={router} />
	</QueryClientProvider>,
);
