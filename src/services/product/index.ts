import type { ProductListResponse, ProductDetailResponse } from "@interfaces/product";
import Api from "@services/api";

const DEFAULT_LOCAL_ID = 'LOCAL-001';

export const getProducts = async (localId: string = DEFAULT_LOCAL_ID, limit: number = 100, startKey?: string) => {
    const api = await Api.getInstance("products");
    const response = await api.post<{ local_id: string; limit: number; start_key?: string; }, ProductListResponse>({
        local_id: localId,
        limit,
        start_key: startKey,
    }, { url: "/productos/list" });
    return response.data;
}

export const getProductById = async (localId: string, productoId: string) => {
    const api = await Api.getInstance("products");
    const response = await api.post<{ local_id: string; producto_id: string; }, ProductDetailResponse>({
        local_id: localId,
        producto_id: productoId,
    }, { url: "/productos/id" });
    return response.data;
}