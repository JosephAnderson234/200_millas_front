export interface MockOrder {
    pedido_id: string;
    local_id: string;
    tenant_id_usuario: string;
    productos: Array<{
        producto_id: string;
        cantidad: number;
    }>;
    costo: number;
    direccion: string;
    estado: string;
    created_at: string;
}

export const MOCK_ORDERS: MockOrder[] = [
    {
        pedido_id: "e4ea48e8-9a4c-48be-b5a0-281093271604",
        local_id: "LOCAL-001",
        tenant_id_usuario: "millas#juan.cliente@200millas.com",
        productos: [
            {
                producto_id: "75054529-b9d3-4fef-a5e9-21889818ce79",
                cantidad: 2
            }
        ],
        costo: 91.00,
        direccion: "Av. Principal 123, Lima, Perú",
        estado: "procesando",
        created_at: new Date().toISOString()
    },
    {
        pedido_id: "f5fb59f9-0b5d-59cf-c6b1-392104382715",
        local_id: "LOCAL-001",
        tenant_id_usuario: "millas#juan.cliente@200millas.com",
        productos: [
            {
                producto_id: "2be9e880-9a55-4ff4-88c9-ab272fc047af",
                cantidad: 1
            },
            {
                producto_id: "3ce9e880-9a55-4ff4-88c9-ab272fc047af",
                cantidad: 1
            }
        ],
        costo: 60.50,
        direccion: "Calle Los Olivos 456, Lima, Perú",
        estado: "en_preparacion",
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        pedido_id: "g6gc60g0-1c6e-60dg-d7c2-403215493826",
        local_id: "LOCAL-001",
        tenant_id_usuario: "millas#juan.cliente@200millas.com",
        productos: [
            {
                producto_id: "4de9e880-9a55-4ff4-88c9-ab272fc047af",
                cantidad: 1
            }
        ],
        costo: 38.00,
        direccion: "Jr. Las Flores 789, Lima, Perú",
        estado: "pedido_en_camino",
        created_at: new Date(Date.now() - 7200000).toISOString()
    }
];

let orderCounter = MOCK_ORDERS.length;

export const createMockOrder = (orderData: Omit<MockOrder, 'pedido_id' | 'created_at' | 'tenant_id_usuario'>) => {
    const newOrder: MockOrder = {
        ...orderData,
        pedido_id: `mock-order-${++orderCounter}-${Date.now()}`,
        tenant_id_usuario: "millas#juan.cliente@200millas.com",
        created_at: new Date().toISOString()
    };
    
    MOCK_ORDERS.push(newOrder);
    return newOrder;
};

export const getMockOrderById = (orderId: string) => {
    return MOCK_ORDERS.find(o => o.pedido_id === orderId);
};

export const getMockOrderStatus = (orderId: string) => {
    const order = getMockOrderById(orderId);
    if (!order) return null;
    
    return {
        local_id: order.local_id,
        pedido_id: order.pedido_id,
        estado: order.estado
    };
};

export const updateMockOrderStatus = (orderId: string, newStatus: string) => {
    const order = MOCK_ORDERS.find(o => o.pedido_id === orderId);
    if (order) {
        order.estado = newStatus;
    }
    return order;
};
