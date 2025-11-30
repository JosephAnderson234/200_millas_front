# 🎭 Configuración de Datos Mock - 200 Millas

## ✅ Implementación Completada

Se ha implementado un sistema completo de datos mockeados para desarrollo sin necesidad de backend.

## 📁 Archivos Creados

### Configuración
- `src/config/mockConfig.ts` - Control centralizado del modo mock
- `.env` - Variables de entorno (mock activado por defecto)
- `.env.example` - Plantilla de configuración

### Datos Mock
- `src/services/mockData/auth.mock.ts` - 3 usuarios de prueba
- `src/services/mockData/products.mock.ts` - 18 productos variados
- `src/services/mockData/orders.mock.ts` - 3 pedidos de ejemplo

### Servicios
- `src/services/auth.service.ts` - Autenticación con soporte mock
- `src/services/products.service.ts` - Productos con soporte mock
- `src/services/orders.service.ts` - Pedidos con soporte mock
- `src/services/product/index.ts` - Actualizado con soporte mock

### Documentación
- `src/services/README.md` - Guía completa de uso
- `MOCK_SETUP.md` - Este archivo

## 🎯 Cómo Usar

### 1. Activar Modo Mock (Por Defecto)

El modo mock ya está activado. Verifica que tu archivo `.env` contenga:

```env
VITE_USE_MOCK_DATA=true
```

### 2. Iniciar la Aplicación

```bash
npm run dev
```

### 3. Probar la Carta

1. Ve a la sección **"Nuestra Carta"**
2. Verás 18 productos organizados por categorías:
   - Ceviches (4)
   - Leche de Tigre (2)
   - Fritazo (3)
   - Bowls Del Tigre (2)
   - Promociones (2)
   - Express (2)
   - Sopas Power (2)

### 4. Iniciar Sesión

Usa cualquiera de estos usuarios de prueba:

**Cliente:**
- Email: `juan.cliente@200millas.com`
- Contraseña: `password123`

**Gerente:**
- Email: `maria.gerente@200millas.com`
- Contraseña: `password123`

**Test:**
- Email: `test@test.com`
- Contraseña: `test123`

### 5. Crear Pedidos

1. Agrega productos al carrito desde la carta
2. Ve a "Ver Pedido"
3. Completa el formulario de pedido
4. El pedido se creará con datos mock

## 🔄 Cambiar a Datos Reales

Para usar las APIs reales en lugar de datos mock:

1. Edita el archivo `.env`:
   ```env
   VITE_USE_MOCK_DATA=false
   ```

2. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🔍 Identificar Modo Activo

Cuando el modo mock está activo, verás en la consola del navegador:

```
🎭 [MOCK] Obteniendo productos mockeados para la carta
🎭 [MOCK] Iniciando sesión con datos mockeados
🎭 [MOCK] Creando pedido mockeado
```

## 📊 Datos Mock Disponibles

### Productos (18 total)

| Categoría | Cantidad | Rango de Precios |
|-----------|----------|------------------|
| Ceviches | 4 | S/ 32.00 - S/ 45.50 |
| Leche de Tigre | 2 | S/ 18.00 - S/ 25.00 |
| Fritazo | 3 | S/ 28.50 - S/ 52.00 |
| Bowls Del Tigre | 2 | S/ 32.00 - S/ 38.00 |
| Promociones | 2 | S/ 85.00 - S/ 120.00 |
| Express | 2 | S/ 22.00 - S/ 25.00 |
| Sopas Power | 2 | S/ 28.00 - S/ 35.00 |

### Usuarios (3 total)

- 2 Clientes
- 1 Gerente

### Pedidos (3 total)

- Estados: procesando, en_preparacion, pedido_en_camino

## 🛠️ Desarrollo

### Agregar Más Productos Mock

Edita `src/services/mockData/products.mock.ts`:

```typescript
{
    producto_id: "nuevo-id-unico",
    local_id: "LOCAL-001",
    nombre: "Nuevo Producto",
    descripcion: "Descripción del producto",
    precio: 29.90,
    categoria: "Ceviches", // Debe coincidir con CATEGORIES en Menu.tsx
    stock: 15,
    imagen_url: "https://..."
}
```

### Agregar Más Usuarios Mock

Edita `src/services/mockData/auth.mock.ts`:

```typescript
{
    correo: "nuevo@email.com",
    contrasena: "password",
    nombre: "Nombre Usuario",
    role: "Cliente",
    token: "mock-token-unique"
}
```

## ⚠️ Notas Importantes

1. **Persistencia**: Los datos mock NO persisten entre recargas de página
2. **Producción**: Siempre desactiva el modo mock en producción
3. **Testing**: Ideal para desarrollo y pruebas sin backend
4. **Latencia**: Los mocks incluyen delays simulados (300-1000ms)

## 🚀 Próximos Pasos

1. ✅ Modo mock implementado y funcionando
2. ✅ 18 productos en la carta
3. ✅ Sistema de autenticación mock
4. ✅ Sistema de pedidos mock
5. 🔄 Integrar con APIs reales cuando estén disponibles

## 📞 Soporte

Si encuentras problemas:

1. Verifica que `.env` existe y tiene `VITE_USE_MOCK_DATA=true`
2. Revisa la consola del navegador para mensajes 🎭 [MOCK]
3. Reinicia el servidor de desarrollo
4. Limpia caché del navegador (Ctrl + Shift + R)

---

**Última actualización**: Configuración completa de mock data para desarrollo
