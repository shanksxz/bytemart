import { api } from "@/utils/api-client";
import type { QueryConfig } from "@/utils/react-query";
import type { ApiResponse, ProductResponse } from "@bytemart/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProductById = ({
	productId,
}: { productId: ProductResponse["id"] }): Promise<
	ApiResponse<ProductResponse>
> => {
	return api.get(`/product/${productId}`);
};

export const getProductByIdQueryOptions = ({
	productId,
}: { productId: ProductResponse["id"] }) => {
	return queryOptions({
		queryKey: ["product", productId],
		queryFn: () => getProductById({ productId }),
	});
};

export const useProductById = ({
	productId,
	queryConfig = {},
}: {
	productId: ProductResponse["id"];
	queryConfig?: QueryConfig<typeof getProductByIdQueryOptions>;
}) => {
	return useQuery({
		...getProductByIdQueryOptions({ productId }),
		...queryConfig,
	});
};
