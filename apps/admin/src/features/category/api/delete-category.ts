import { api } from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/utils/react-query';
import type { Category, ApiResponse } from '@bytemart/types';
import { getCategoriesQueryOptions } from './get-category';

export const deleteCategory = ({ categoryId } : { categoryId: Category["id"]} ) : Promise<ApiResponse<Category>> => {
  return api.delete(`/category/${categoryId}`);
}

export const useDeleteCategory = ({ mutationConfig } : { mutationConfig?: MutationConfig<typeof deleteCategory> }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: deleteCategory,
    ...restConfig,
  });
}