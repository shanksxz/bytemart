import { api } from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/utils/react-query';
import type { Product, ApiResponse } from '@bytemart/types';
import { getProductsQueryOptions } from './get-products';

export const editProduct = ({ productId, product } : { productId: Product["id"], product: Product }) : Promise<ApiResponse<Product>> => {
    return api.put(`/product/${productId}`, product);
}

export const useEditProduct = ({ mutationConfig } : { mutationConfig?: MutationConfig<typeof editProduct> }) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};
    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getProductsQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        mutationFn: editProduct,
        ...restConfig,
    });
}