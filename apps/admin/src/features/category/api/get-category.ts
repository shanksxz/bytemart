import { api } from '@/utils/api-client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import type { Category, ApiResponse } from '@bytemart/types';
import type { QueryConfig } from '@/utils/react-query';

export const getCategories = () : Promise<ApiResponse<Category[]>> => {
    return api.get('/categories');
};

export const getCategoriesQueryOptions = () => {
    return queryOptions({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })
}

export const useCategories = ({ queryConfig = {} } : { queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>}) => {
    return useQuery({
        ...getCategoriesQueryOptions(),
        ...queryConfig,
    });
}