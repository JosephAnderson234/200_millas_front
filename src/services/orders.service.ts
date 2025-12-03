import Api from "./api";

export interface CreateOrderRequest {
    local_id: string;
    productos: Array<{
        producto_id: string;
        cantidad: number;
    }>;
    costo: number;
    direccion: string;
    estado: string;
}

export interface CreateOrderResponse {
    message: string;
    pedido: {
        local_id: string;
        pedido_id: string;
        tenant_id_usuario: string;
        productos: Array<{
            producto_id: string;
            cantidad: number;
        }>;
        costo: string | number;
        direccion: string;
        estado: string;
        created_at: string;
    };
}

export interface GetOrderStatusRequest {
    local_id: string;
    pedido_id: string;
}

export interface GetOrderStatusResponse {
    local_id: string;
    pedido_id: string;
    estado: string;
}

export interface ConfirmOrderRequest {
    order_id: string;
    empleado_id: string;
}

export interface ConfirmOrderResponse {
    message: string;
    order_id: string;
}

class OrdersService {
    async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
        

        // Llamada real a la API
        const api = await Api.getInstance("clientes");
        const response = await api.post<CreateOrderRequest, CreateOrderResponse>(
            request,
            { url: "/pedido/create" }
        );

        return response.data;
    }

    async getOrderStatus(request: GetOrderStatusRequest): Promise<GetOrderStatusResponse> {
        
        const api = await Api.getInstance("clientes");
        const response = await api.get<void, GetOrderStatusResponse>({
            url: "/pedido/status",
            params: {
                local_id: request.local_id,
                pedido_id: request.pedido_id
            }
        });

        return response.data;
    }

    /**
     * Cliente confirma la recepción del pedido
     */
    async confirmOrder(request: ConfirmOrderRequest): Promise<ConfirmOrderResponse> {
        
        const api = await Api.getInstance("clientes");
        const response = await api.post<ConfirmOrderRequest, ConfirmOrderResponse>(
            request,
            { url: "/pedido/confirmar" }
        );

        return response.data;
    }
}

export default new OrdersService();
