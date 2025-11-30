import Api from "./api";
import { isMockEnabled } from "../config/mockConfig";
import { getMockProducts, getMockProductById } from "./mockData/products.mock";
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
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Listando productos mockeados");
            const mockProducts = getMockProducts(request.local_id);
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        contents: mockProducts,
                        page: 0,
                        size: mockProducts.length,
                        totalElements: mockProducts.length,
                        totalPages: 1
                    });
                }, 500); // Simular latencia de red
            });
        }

        // Llamada real a la API
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
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Obteniendo producto mockeado:", request.producto_id);
            const mockProduct = getMockProductById(request.producto_id);
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (mockProduct) {
                        resolve({ producto: mockProduct });
                    } else {
                        reject(new Error("Producto no encontrado"));
                    }
                }, 300);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("products");
        const response = await api.post<GetProductByIdRequest, GetProductByIdResponse>(
            request,
            { url: "/productos/id" }
        );

        return response.data;
    }
}

export default new ProductsService();
