import type { ProductListResponse } from "@interfaces/product";
import Api from "@services/api";
import { isMockEnabled } from "../../config/mockConfig";
import { getMockProducts } from "@services/mockData/products.mock";

const DEFAULT_LOCAL_ID = 'LOCAL-001';

export const getProducts = async (localId: string = DEFAULT_LOCAL_ID, limit: number = 100, startKey?: string) => {
    // Si está habilitado el modo mock, devolver datos mockeados
    if (isMockEnabled()) {
        console.log("🎭 [MOCK] Obteniendo productos mockeados para la carta");
        
        return new Promise<ProductListResponse>((resolve) => {
            setTimeout(() => {
                const mockProducts = getMockProducts(localId);
                
                resolve({
                    contents: mockProducts,
                    page: 0,
                    size: mockProducts.length,
                    next_token: undefined
                });
            }, 600); // Simular latencia de red
        });
    }

    // Llamada real a la API
    const api = await Api.getInstance("products");
    const response = await api.post<{ local_id: string; limit: number; start_key?: string; }, ProductListResponse>({
        local_id: localId,
        limit,
        start_key: startKey,
    }, { url: "/productos/list" });
    return response.data;
}