import { api } from "@/utils/api-client";
import type { QueryConfig } from "@/utils/react-query";
import type { ApiResponse, ProductResponse } from "@bytemart/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProducts = (): Promise<ApiResponse<ProductResponse[]>> => {
	return api.get("/product");
};

export const getProductsQueryOptions = () => {
	return queryOptions({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});
};

export const useProducts = ({
	queryConfig = {},
}: { queryConfig?: QueryConfig<typeof getProductsQueryOptions> }) => {
	return useQuery({
		...getProductsQueryOptions(),
		...queryConfig,
	});
};
