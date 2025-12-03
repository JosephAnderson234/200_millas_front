export interface Product {
    local_id: string;
    producto_id: string;
    nombre: string;
    precio: string | number;
    descripcion: string;
    categoria: string;
    stock: string | number;
    imagen_url: string;
}

export interface ProductListResponse {
    contents: Product[];
    size: number;
    next_token?: string | null;
    page?: number;
    totalElements?: number;
    totalPages?: number;
}

export interface ProductDetailResponse {
    producto: Product;
}