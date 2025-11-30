import type { Product } from "../../interfaces/product";

// Interfaz extendida para datos mock con ID
interface MockProduct extends Product {
    producto_id: string;
}

export const MOCK_PRODUCTS: MockProduct[] = [
    // Ceviches
    {
        producto_id: "75054529-b9d3-4fef-a5e9-21889818ce79",
        local_id: "LOCAL-001",
        nombre: "Ceviche de Conchas Negras Premium",
        descripcion: "Delicioso ceviche preparado con conchas negras frescas del norte del Perú",
        precio: 45.50,
        categoria: "Ceviches",
        stock: 20,
        imagen_url: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop"
    },
    {
        producto_id: "4de9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Tiradito de Pescado",
        descripcion: "Finas láminas de pescado fresco con salsa de ají amarillo",
        precio: 38.00,
        categoria: "Ceviches",
        stock: 18,
        imagen_url: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop"
    },
    {
        producto_id: "7ae9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Ceviche Clásico",
        descripcion: "Ceviche tradicional de pescado con limón, cebolla y ají",
        precio: 32.00,
        categoria: "Ceviches",
        stock: 25,
        imagen_url: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop"
    },
    {
        producto_id: "8be9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Ceviche Mixto",
        descripcion: "Combinación de pescado y mariscos frescos",
        precio: 42.00,
        categoria: "Ceviches",
        stock: 15,
        imagen_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop"
    },
    
    // Leche de Tigre
    {
        producto_id: "6fe9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Leche de Tigre Clásica",
        descripcion: "Jugo de ceviche con trozos de pescado y mariscos",
        precio: 18.00,
        categoria: "Leche de Tigre",
        stock: 30,
        imagen_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
    },
    {
        producto_id: "9ce9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Leche de Tigre Especial",
        descripcion: "Con pulpo, calamar y langostinos",
        precio: 25.00,
        categoria: "Leche de Tigre",
        stock: 20,
        imagen_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
    },

    // Fritazo
    {
        producto_id: "3ce9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Chicharrón de Calamar",
        descripcion: "Calamares fritos crujientes con salsa tártara",
        precio: 28.50,
        categoria: "Fritazo",
        stock: 25,
        imagen_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop"
    },
    {
        producto_id: "5ee9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Jalea Mixta",
        descripcion: "Mezcla de mariscos y pescado frito con yuca y salsa criolla",
        precio: 52.00,
        categoria: "Fritazo",
        stock: 12,
        imagen_url: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop"
    },
    {
        producto_id: "ace9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Chicharrón de Pescado",
        descripcion: "Trozos de pescado frito con yuca y salsa criolla",
        precio: 35.00,
        categoria: "Fritazo",
        stock: 20,
        imagen_url: "https://images.unsplash.com/photo-1580959375944-1ab5b8c78f15?w=400&h=300&fit=crop"
    },

    // Bowls Del Tigre
    {
        producto_id: "2be9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Bowl Marino Clásico",
        descripcion: "Arroz, pescado, mariscos y vegetales frescos",
        precio: 32.00,
        categoria: "Bowls Del Tigre",
        stock: 15,
        imagen_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
        producto_id: "bde9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Bowl Power Marino",
        descripcion: "Bowl energético con quinoa, salmón y aguacate",
        precio: 38.00,
        categoria: "Bowls Del Tigre",
        stock: 18,
        imagen_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },

    // Promociones
    {
        producto_id: "cee9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Promo Duo Marino",
        descripcion: "2 ceviches clásicos + 2 leches de tigre",
        precio: 40.00,
        categoria: "Promociones",
        stock: 10,
        imagen_url: "https://cdn0.recetasgratis.net/es/posts/4/7/5/leche_de_tigre_peruana_76574_orig.jpg"
    },
    {
        producto_id: "dfe9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Promo Familiar",
        descripcion: "Jalea mixta + ceviche mixto + arroz con mariscos",
        precio: 80.00,
        categoria: "Promociones",
        stock: 8,
        imagen_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmxNXJlzDBM4xT7pE7-136wY2HO18yzG-1A&s"
    },

    // Express
    {
        producto_id: "efe9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Ceviche Express",
        descripcion: "Porción personal lista en 5 minutos",
        precio: 22.00,
        categoria: "Express",
        stock: 30,
        imagen_url: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop"
    },
    {
        producto_id: "f0e9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Bowl Express",
        descripcion: "Bowl marino rápido y nutritivo",
        precio: 25.00,
        categoria: "Express",
        stock: 25,
        imagen_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },

    // Sopas Power
    {
        producto_id: "g1e9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Parihuela",
        descripcion: "Sopa de mariscos con pescado y ají panca",
        precio: 35.00,
        categoria: "Sopas Power",
        stock: 15,
        imagen_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
    },
    {
        producto_id: "h2e9e880-9a55-4ff4-88c9-ab272fc047af",
        local_id: "LOCAL-001",
        nombre: "Chilcano de Pescado",
        descripcion: "Sopa reconfortante de pescado con yuca",
        precio: 28.00,
        categoria: "Sopas Power",
        stock: 20,
        imagen_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
    }
];

export const getMockProducts = (localId?: string): Product[] => {
    if (localId) {
        return MOCK_PRODUCTS.filter(p => p.local_id === localId);
    }
    return MOCK_PRODUCTS;
};

export const getMockProductById = (productId: string): MockProduct | undefined => {
    return MOCK_PRODUCTS.find(p => p.producto_id === productId);
};
