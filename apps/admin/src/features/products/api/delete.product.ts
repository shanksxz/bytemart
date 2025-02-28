import { api } from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/utils/react-query';
import type { Product, ApiResponse } from '@bytemart/types';
import { getProductsQueryOptions } from './get-products';

export const deleteProduct = ({ productId } : { productId: Product["id"]} ) : Promise<ApiResponse<Product>> => {
  return api.delete(`/product/${productId}`);
}

export const useDeleteProduct = ({ mutationConfig } : { mutationConfig?: MutationConfig<typeof deleteProduct> }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: deleteProduct,
    ...restConfig,
  });
}