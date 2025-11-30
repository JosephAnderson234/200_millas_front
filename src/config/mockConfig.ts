/**
 * Configuración global para habilitar/deshabilitar datos mockeados
 * 
 * Para usar datos reales de la API:
 * 1. Cambia USE_MOCK_DATA a false
 * 2. O establece la variable de entorno VITE_USE_MOCK_DATA=false
 */

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true;

export const isMockEnabled = () => USE_MOCK_DATA;
