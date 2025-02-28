import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/orders')({
  component: () => {
    return <div>Orders Page</div>
  }
}) 