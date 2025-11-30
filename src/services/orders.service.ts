import Api from "./api";
import { isMockEnabled } from "../config/mockConfig";
import {
    createMockOrder,
    getMockOrderStatus,
    updateMockOrderStatus,
    type MockOrder
} from "./mockData/orders.mock";

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
    /**
     * Crea un nuevo pedido
     */
    async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Creando pedido mockeado");
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    const mockOrder = createMockOrder(request);
                    
                    resolve({
                        message: "Pedido registrado",
                        pedido: {
                            ...mockOrder,
                            costo: mockOrder.costo.toString()
                        }
                    });
                }, 800);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("clientes");
        const response = await api.post<CreateOrderRequest, CreateOrderResponse>(
            request,
            { url: "/pedido/create" }
        );

        return response.data;
    }

    /**
     * Consulta el estado de un pedido
     */
    async getOrderStatus(request: GetOrderStatusRequest): Promise<GetOrderStatusResponse> {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Consultando estado de pedido:", request.pedido_id);
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const status = getMockOrderStatus(request.pedido_id);
                    
                    if (status) {
                        resolve(status);
                    } else {
                        reject(new Error("Pedido no encontrado"));
                    }
                }, 400);
            });
        }

        // Llamada real a la API
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
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Confirmando pedido:", request.order_id);
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Actualizar estado del pedido mockeado
                    updateMockOrderStatus(request.order_id, "entregado");
                    
                    resolve({
                        message: "ConfirmarPedidoCliente event published",
                        order_id: request.order_id
                    });
                }, 600);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("clientes");
        const response = await api.post<ConfirmOrderRequest, ConfirmOrderResponse>(
            request,
            { url: "/pedido/confirmar" }
        );

        return response.data;
    }
}

export default new OrdersService();
