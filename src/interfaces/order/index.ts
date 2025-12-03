export interface OrderProduct {
    producto_id: string;
    cantidad: number;
}

export interface Order {
    local_id: string;
    pedido_id: string;
    correo: string;
    productos: OrderProduct[];
    costo: number | string;
    direccion: string;
    estado: string;
    created_at: string;
    tenant_id_usuario?: string;
}

export interface CreateOrderRequest {
    local_id: string;
    productos: OrderProduct[];
    costo: number;
    direccion: string;
    estado?: string;
}

export interface CreateOrderResponse {
    message: string;
    pedido: Order;
}

export interface ConfirmOrderRequest {
    order_id: string;
    empleado_id: string;
}

export interface ConfirmOrderResponse {
    message: string;
    order_id: string;
}

export interface OrderStatusResponse {
    local_id: string;
    pedido_id: string;
    estado: string;
}

export interface OrderHistoryResponse {
    pedidos: Order[];
    size: number;
    next_token: string | null;
}
