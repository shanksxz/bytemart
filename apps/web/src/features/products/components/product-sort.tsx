import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ProductSort() {
	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm text-gray-500">Sort by:</span>
			<Select defaultValue="featured">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="featured">Featured</SelectItem>
					<SelectItem value="price-asc">Price: Low to High</SelectItem>
					<SelectItem value="price-desc">Price: High to Low</SelectItem>
					<SelectItem value="rating">Highest Rated</SelectItem>
					<SelectItem value="newest">Newest Arrivals</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
