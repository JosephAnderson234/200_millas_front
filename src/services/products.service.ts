import Api from "./api";
import type { Product } from "../interfaces/product";

export interface ListProductsRequest {
    local_id: string;
}

export interface ListProductsResponse {
    contents: Product[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface GetProductByIdRequest {
    local_id: string;
    producto_id: string;
}

export interface GetProductByIdResponse {
    producto: Product;
}

class ProductsService {
    /**
     * Lista todos los productos de un local
     */
    async listProducts(request: ListProductsRequest): Promise<ListProductsResponse> {
        const api = await Api.getInstance("products");
        const response = await api.post<ListProductsRequest, ListProductsResponse>(
            request,
            { url: "/productos/list" }
        );

        return response.data;
    }

    /**
     * Obtiene un producto específico por ID
     */
    async getProductById(request: GetProductByIdRequest): Promise<GetProductByIdResponse> {
        const api = await Api.getInstance("products");
        const response = await api.post<GetProductByIdRequest, GetProductByIdResponse>(
            request,
            { url: "/productos/id" }
        );

        return response.data;
    }
}

export default new ProductsService();
