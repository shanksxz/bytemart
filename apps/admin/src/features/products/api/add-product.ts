import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Product, type ApiResponse } from "@bytemart/types";
import { MutationConfig } from "@/utils/react-query";
import { api } from "@/utils/api-client";
import { getProductsQueryOptions } from "./get-products";

export const createProduct = ({
    product,
}: {
    product: Product;
}): Promise<ApiResponse<Product>> => {
        return api.post("/product", product);
};

export const useCreateProduct = ({ mutationConfig } : { mutationConfig?: MutationConfig<typeof createProduct> }) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restConfig } = mutationConfig || {};
	return useMutation({
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: getProductsQueryOptions().queryKey,
			});
			onSuccess?.(...args);
		},
		mutationFn: createProduct,
		...restConfig,
	});
};