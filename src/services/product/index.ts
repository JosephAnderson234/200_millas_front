import type { ProductListResponse, ProductDetailResponse } from "@interfaces/product";
import Api from "@services/api";

export const getProducts = async (
    localId: string,
    options?: {
        size?: number;
        next_token?: string;
        page?: number;
        categoria?: string;
        include_total?: boolean;
        nombre?: string;
    }
) => {
    const api = await Api.getInstance("products");
    
    const payload: {
        local_id: string;
        size?: number;
        next_token?: string;
        page?: number;
        categoria?: string;
        include_total?: boolean;
        nombre?: string;
    } = {
        local_id: localId,
        ...options
    };
    
    const response = await api.post<typeof payload, ProductListResponse>(
        payload,
        { url: "/productos/list" }
    );
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