import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const reviews = [
	{
		id: 1,
		author: "John D.",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 5,
		date: "2023-12-15",
		title: "Excellent picture quality",
		content:
			"I've been using this TV for a month now and I'm extremely impressed with the picture quality. The 4K resolution is stunning and the colors are vibrant. The smart features are also very intuitive and easy to use.",
		helpful: 24,
		verified: true,
	},
	{
		id: 2,
		author: "Sarah M.",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 4,
		date: "2023-11-28",
		title: "Great TV, but the remote could be better",
		content:
			"The TV itself is fantastic with amazing picture quality and sound. The smart features work well and it was easy to set up. My only complaint is that the remote feels a bit cheap compared to the quality of the TV itself.",
		helpful: 18,
		verified: true,
	},
	{
		id: 3,
		author: "Michael P.",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 5,
		date: "2023-11-10",
		title: "Worth every penny",
		content:
			"This TV exceeded my expectations. The picture is crystal clear, the sound is impressive for a flat screen TV, and the smart features are responsive and easy to navigate. I highly recommend this to anyone looking for a high-quality TV.",
		helpful: 32,
		verified: true,
	},
	{
		id: 4,
		author: "Emily R.",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 3,
		date: "2023-10-22",
		title: "Good, but not great",
		content:
			"The picture quality is good, but I've had some issues with the smart features being slow at times. The TV also runs a bit hot after being on for a few hours. It's a decent TV for the price, but I expected a bit more.",
		helpful: 7,
		verified: true,
	},
];

// Calculate rating distribution
const ratingCounts = [0, 0, 0, 0, 0];
reviews.forEach((review) => {
	ratingCounts[review.rating - 1]++;
});
const totalReviews = reviews.length;

export function ProductReviews({
	productId,
	rating,
	reviewCount,
}: {
	productId: string;
	rating: number;
	reviewCount: number;
}) {
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Rating Summary */}
				<div className="md:col-span-1">
					<div className="flex flex-col items-center p-6 border rounded-lg">
						<h3 className="text-2xl font-bold">{rating.toFixed(1)}</h3>
						<div className="flex items-center my-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`h-5 w-5 ${
										i < Math.floor(rating)
											? "text-yellow-400 fill-yellow-400"
											: i < rating
												? "text-yellow-400 fill-yellow-400"
												: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<p className="text-sm text-gray-500 mb-4">
							Based on {reviewCount} reviews
						</p>

						<div className="w-full space-y-2">
							{[5, 4, 3, 2, 1].map((star) => (
								<div key={star} className="flex items-center gap-2">
									<span className="text-sm w-6">{star}</span>
									<Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
									<Progress
										value={
											totalReviews > 0
												? (ratingCounts[star - 1] / totalReviews) * 100
												: 0
										}
										className="h-2 flex-1"
									/>
									<span className="text-sm w-8 text-right">
										{ratingCounts[star - 1]}
									</span>
								</div>
							))}
						</div>

						<Button className="mt-6 w-full">Write a Review</Button>
					</div>
				</div>

				{/* Reviews List */}
				<div className="md:col-span-2">
					<div className="space-y-6">
						{reviews.map((review) => (
							<div key={review.id} className="border-b pb-6 last:border-0">
								<div className="flex justify-between items-start mb-2">
									<div className="flex items-center gap-3">
										<Avatar>
											<AvatarImage src={review.avatar} alt={review.author} />
											<AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-medium">{review.author}</div>
											<div className="text-sm text-gray-500">
												{new Date(review.date).toLocaleDateString()}
												{review.verified && (
													<span className="ml-2 text-green-600">
														✓ Verified Purchase
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="flex">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
											/>
										))}
									</div>
								</div>

								<h4 className="font-semibold mb-2">{review.title}</h4>
								<p className="text-gray-700 mb-4">{review.content}</p>

								<div className="flex items-center text-sm">
									<Button variant="ghost" size="sm">
										Was this review helpful? ({review.helpful})
									</Button>
									<Button variant="ghost" size="sm">
										Report
									</Button>
								</div>
							</div>
						))}
					</div>

					<Button variant="outline" className="mt-6 w-full">
						Load More Reviews
					</Button>
				</div>
			</div>
		</div>
	);
}
