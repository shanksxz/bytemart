import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api-client';
import type { QueryConfig } from '@/utils/react-query';
import type { Product, ApiResponse } from '@bytemart/types';

export const getProducts = () : Promise<ApiResponse<Product[]>> => {
  return api.get('/product');
};

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ['products'],
    queryFn: () => {
      const response = getProducts();
      return response;
    },
  })
}

export const useProducts = ({ queryConfig = {} } : { queryConfig?: QueryConfig<typeof getProductsQueryOptions>}) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  });
}
