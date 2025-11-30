export interface Product {
    local_id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    stock: number;
    imagen_url: string;
}

export interface ProductListResponse {
    contents: Product[];
    size: number;
    next_token?: string;
    page: number;
}