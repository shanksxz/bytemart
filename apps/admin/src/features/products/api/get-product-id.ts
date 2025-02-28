import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api-client';
import type { QueryConfig } from '@/utils/react-query';
import type { Product, ApiResponse } from '@bytemart/types';

export const getProductById = ({ productId } : { productId: Product['id'] }) : Promise<ApiResponse<Product>> => {
    return api.get(`/product/${productId}`);
};

export const getProductByIdQueryOptions = ({ productId } : { productId: Product['id'] }) => {
    return queryOptions({
        queryKey: ['product', productId],
        queryFn: () => getProductById({ productId }),
    });
};

export const useProductById = ({ productId, queryConfig = {} } : { productId: Product['id'], queryConfig?: QueryConfig<typeof getProductByIdQueryOptions> }) => {
    return useQuery({
        ...getProductByIdQueryOptions({ productId }),
        ...queryConfig,
    });
};