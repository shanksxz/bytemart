import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductFilters() {
	const [priceRange, setPriceRange] = useState([0, 2000]);

	const brands = [
		{ id: "apple", label: "Apple" },
		{ id: "samsung", label: "Samsung" },
		{ id: "sony", label: "Sony" },
		{ id: "lg", label: "LG" },
		{ id: "microsoft", label: "Microsoft" },
		{ id: "dell", label: "Dell" },
		{ id: "hp", label: "HP" },
	];

	const categories = [
		{ id: "smartphones", label: "Smartphones" },
		{ id: "laptops", label: "Laptops & Computers" },
		{ id: "tvs", label: "TVs & Displays" },
		{ id: "audio", label: "Audio" },
		{ id: "wearables", label: "Wearables" },
		{ id: "cameras", label: "Cameras" },
		{ id: "gaming", label: "Gaming" },
	];

	const features = [
		{ id: "wireless", label: "Wireless" },
		{ id: "bluetooth", label: "Bluetooth" },
		{ id: "4k", label: "4K" },
		{ id: "hdr", label: "HDR" },
		{ id: "touchscreen", label: "Touchscreen" },
		{ id: "waterproof", label: "Waterproof" },
	];

	return (
		<div className="bg-white p-4 rounded-lg border">
			<h2 className="font-semibold text-lg mb-4">Filters</h2>

			<Accordion type="multiple" defaultValue={["price", "brand", "category"]}>
				{/* Price Range Filter */}
				<AccordionItem value="price">
					<AccordionTrigger>Price Range</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-4">
							<Slider
								defaultValue={[0, 2000]}
								max={2000}
								step={10}
								value={priceRange}
								onValueChange={setPriceRange}
							/>
							<div className="flex items-center justify-between">
								<span>${priceRange[0]}</span>
								<span>${priceRange[1]}</span>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Brand Filter */}
				<AccordionItem value="brand">
					<AccordionTrigger>Brand</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-2">
							{brands.map((brand) => (
								<div key={brand.id} className="flex items-center space-x-2">
									<Checkbox id={`brand-${brand.id}`} />
									<Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Category Filter */}
				<AccordionItem value="category">
					<AccordionTrigger>Category</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-2">
							{categories.map((category) => (
								<div key={category.id} className="flex items-center space-x-2">
									<Checkbox id={`category-${category.id}`} />
									<Label htmlFor={`category-${category.id}`}>
										{category.label}
									</Label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* Features Filter */}
				<AccordionItem value="features">
					<AccordionTrigger>Features</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-2">
							{features.map((feature) => (
								<div key={feature.id} className="flex items-center space-x-2">
									<Checkbox id={`feature-${feature.id}`} />
									<Label htmlFor={`feature-${feature.id}`}>
										{feature.label}
									</Label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className="mt-6 space-x-2 flex">
				<Button variant="outline" className="flex-1">
					Reset
				</Button>
				<Button className="flex-1">Apply</Button>
			</div>
		</div>
	);
}
