import { api } from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/utils/react-query';
import type { Category, ApiResponse } from '@bytemart/types';
import { getCategoriesQueryOptions } from './get-category';

export const addCategory = ({ category } : { category: Category }) : Promise<ApiResponse<Category>> => {
  return api.post('/category', category);
}

export const useAddCategory = ({ mutationConfig } : { mutationConfig?: MutationConfig<typeof addCategory> }) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: addCategory,
    ...restConfig,
  });
}