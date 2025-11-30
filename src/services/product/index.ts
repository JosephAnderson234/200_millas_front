import type { ProductListResponse } from "@interfaces/product";
import Api from "@services/api";


const DEFAULT_LOCAL_ID ='LOCAL-001';

export const getProducts = async (localId: string = DEFAULT_LOCAL_ID, limit: number=100, startKey?: string ) =>{
    const api = await Api.getInstance("products");
    const response =  await api.post<{local_id: string; limit: number; start_key?: string;}, ProductListResponse>({
        local_id: localId,
        limit,
        start_key: startKey,
    }, { url: "/productos/list" });
    return response.data;
}