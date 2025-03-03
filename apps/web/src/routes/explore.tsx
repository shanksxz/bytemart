import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductSort } from "@/features/products/components/product-sort";
import { ProductGrid } from "@/features/products/components/product-grid";
import { Pagination } from "@/features/products/components/pagination";

export const Route = createFileRoute("/explore")({
	component: ExplorePage,
});

export default function ExplorePage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Explore Products</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				<div className="lg:w-1/4">
					<ProductFilters />
				</div>
				<div className="lg:w-3/4">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
						<p className="text-gray-500 mb-4 sm:mb-0">
							Showing 1-12 of 48 products
						</p>
						<ProductSort />
					</div>

					<Suspense fallback={<ProductGridSkeleton />}>
						<ProductGrid />
					</Suspense>

					<div className="mt-8">
						<Pagination totalPages={4} currentPage={1} />
					</div>
				</div>
			</div>
		</div>
	);
}

function ProductGridSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: 9 }).map((_, i) => (
				<div key={i} className="border rounded-lg p-4">
					<Skeleton className="h-48 w-full mb-4" />
					<Skeleton className="h-4 w-3/4 mb-2" />
					<Skeleton className="h-6 w-1/2 mb-4" />
					<Skeleton className="h-10 w-full" />
				</div>
			))}
		</div>
	);
}
