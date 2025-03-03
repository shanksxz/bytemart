import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex justify-center items-center space-x-1">
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === 1}
				asChild={currentPage !== 1}
			>
				{currentPage !== 1 ? (
					<Link to={`?page=${currentPage - 1}`}>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous page</span>
					</Link>
				) : (
					<span>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous page</span>
					</span>
				)}
			</Button>

			{pages.map((page) => (
				<Button
					key={page}
					variant={currentPage === page ? "default" : "outline"}
					size="icon"
					asChild={currentPage !== page}
				>
					{currentPage !== page ? (
						<Link to={`?page=${page}`}>
							{page}
							<span className="sr-only">Page {page}</span>
						</Link>
					) : (
						<span>{page}</span>
					)}
				</Button>
			))}

			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === totalPages}
				asChild={currentPage !== totalPages}
			>
				{currentPage !== totalPages ? (
					<Link to={`?page=${currentPage + 1}`}>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Next page</span>
					</Link>
				) : (
					<span>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Next page</span>
					</span>
				)}
			</Button>
		</div>
	);
}
