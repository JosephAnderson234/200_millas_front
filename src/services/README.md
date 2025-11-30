# Servicios de Cliente - 200 Millas

## 📋 Descripción

Este directorio contiene los servicios para las funcionalidades del cliente, implementados con soporte para datos mockeados y datos reales de la API.

## 🎭 Modo Mock

### ¿Qué es el modo mock?

El modo mock permite desarrollar y probar la aplicación sin necesidad de conectarse a las APIs reales. Los datos son simulados localmente.

### ¿Cómo activar/desactivar el modo mock?

#### Opción 1: Variable de entorno (Recomendado)

Edita el archivo `.env` en la raíz del proyecto:

```env
# Para usar datos mockeados
VITE_USE_MOCK_DATA=true

# Para usar datos reales de la API
VITE_USE_MOCK_DATA=false
```

#### Opción 2: Configuración directa

Edita el archivo `src/config/mockConfig.ts`:

```typescript
// Para usar datos mockeados
export const USE_MOCK_DATA = true;

// Para usar datos reales de la API
export const USE_MOCK_DATA = false;
```

**Nota:** Después de cambiar la configuración, reinicia el servidor de desarrollo.

## 📦 Servicios Disponibles

### AuthService

Gestiona la autenticación y perfil de usuario.

```typescript
import authService from './services/auth.service';

// Iniciar sesión
const loginResponse = await authService.login({
    correo: 'juan.cliente@200millas.com',
    contrasena: 'password123'
});

// Registrar nuevo usuario
const registerResponse = await authService.register({
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    contrasena: 'password123',
    role: 'Cliente'
});

// Obtener perfil del usuario autenticado
const profile = await authService.getMe();

// Actualizar perfil
const updated = await authService.updateMe({
    nombre: 'Juan Pérez Actualizado',
    contrasena: 'newpassword456'
});

// Cambiar contraseña
await authService.changePassword({
    contrasena_actual: 'password123',
    contrasena_nueva: 'newpassword456'
});

// Eliminar cuenta
await authService.deleteMe();
```

**Usuarios Mock Disponibles:**
- `juan.cliente@200millas.com` / `password123` (Cliente)
- `maria.gerente@200millas.com` / `password123` (Gerente)
- `test@test.com` / `test123` (Cliente)

### ProductsService

Gestiona los productos del restaurante.

```typescript
import productsService from './services/products.service';

// Listar productos de un local
const products = await productsService.listProducts({
    local_id: 'LOCAL-001'
});

// Obtener producto por ID
const product = await productsService.getProductById({
    local_id: 'LOCAL-001',
    producto_id: '75054529-b9d3-4fef-a5e9-21889818ce79'
});
```

### OrdersService

Gestiona los pedidos del cliente.

```typescript
import ordersService from './services/orders.service';

// Crear un nuevo pedido
const order = await ordersService.createOrder({
    local_id: 'LOCAL-001',
    productos: [
        { producto_id: '75054529-b9d3-4fef-a5e9-21889818ce79', cantidad: 2 }
    ],
    costo: 91.00,
    direccion: 'Av. Principal 123, Lima, Perú',
    estado: 'procesando'
});

// Consultar estado del pedido
const status = await ordersService.getOrderStatus({
    local_id: 'LOCAL-001',
    pedido_id: 'e4ea48e8-9a4c-48be-b5a0-281093271604'
});

// Confirmar recepción del pedido
const confirmation = await ordersService.confirmOrder({
    order_id: 'e4ea48e8-9a4c-48be-b5a0-281093271604',
    empleado_id: '12345678'
});
```

## 🗂️ Estructura de Archivos

```
src/services/
├── api.ts                      # Cliente HTTP base
├── auth.service.ts             # Servicio de autenticación
├── products.service.ts         # Servicio de productos
├── orders.service.ts           # Servicio de pedidos
├── mockData/
│   ├── auth.mock.ts            # Datos mockeados de autenticación
│   ├── products.mock.ts        # Datos mockeados de productos
│   └── orders.mock.ts          # Datos mockeados de pedidos
└── README.md                   # Este archivo
```

## 🔍 Identificar Modo Activo

Cuando el modo mock está activo, verás en la consola del navegador mensajes como:

```
🎭 [MOCK] Obteniendo productos mockeados para la carta
🎭 [MOCK] Iniciando sesión con datos mockeados
🎭 [MOCK] Creando pedido mockeado
```

## 🍽️ Productos Mock en la Carta

La sección "Nuestra Carta" muestra automáticamente los productos mockeados cuando `VITE_USE_MOCK_DATA=true`.

**Productos disponibles por categoría:**
- **Ceviches** (4 productos): Ceviche de Conchas Negras, Tiradito, Ceviche Clásico, Ceviche Mixto
- **Leche de Tigre** (2 productos): Clásica y Especial
- **Fritazo** (3 productos): Chicharrón de Calamar, Jalea Mixta, Chicharrón de Pescado
- **Bowls Del Tigre** (2 productos): Bowl Marino Clásico, Bowl Power Marino
- **Promociones** (2 productos): Promo Duo Marino, Promo Familiar
- **Express** (2 productos): Ceviche Express, Bowl Express
- **Sopas Power** (2 productos): Parihuela, Chilcano de Pescado

Total: **18 productos mockeados** listos para probar la funcionalidad completa.

## ⚠️ Consideraciones

1. **Desarrollo:** Usa modo mock para desarrollo rápido sin dependencias de backend
2. **Testing:** Usa modo mock para pruebas unitarias y de integración
3. **Producción:** Siempre desactiva el modo mock en producción
4. **Latencia:** Los datos mock incluyen delays simulados para imitar comportamiento real

## 🚀 Próximos Pasos

Para agregar más servicios:

1. Crea el archivo de datos mock en `mockData/`
2. Implementa el servicio con la lógica de mock/real
3. Usa `isMockEnabled()` para alternar entre modos
4. Documenta el servicio en este README
