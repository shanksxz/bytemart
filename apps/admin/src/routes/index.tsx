import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
	component: () => {
		return <div>Dashboard Page</div>
	}
})
