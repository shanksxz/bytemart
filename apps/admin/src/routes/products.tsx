import ProductView from "@/features/products/components/products-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/products')({
  component: () => {
    return <ProductView />
  }
}) 