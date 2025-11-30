# 🔄 Reiniciar Servidor de Desarrollo

## El problema

Vite necesita reiniciarse después de agregar nuevos alias en `vite.config.ts`.

## Solución

### 1. Detener el servidor actual

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

### 2. Reiniciar el servidor

```bash
npm run dev
```

### 3. Limpiar caché (si el problema persiste)

```bash
# Detener el servidor
Ctrl + C

# Eliminar carpeta de caché
rm -rf node_modules/.vite

# O en Windows PowerShell:
Remove-Item -Recurse -Force node_modules/.vite

# Reiniciar
npm run dev
```

## Verificación

Después de reiniciar, deberías ver en la consola del navegador:

```
🎭 [MOCK] Obteniendo productos mockeados para la carta
```

Y la carta debería mostrar 18 productos.

## Si aún hay problemas

Los imports ya están configurados con rutas relativas como fallback, así que debería funcionar incluso si los alias no se resuelven correctamente.

---

**Nota**: Este es un paso necesario solo la primera vez después de agregar los alias al `vite.config.ts`.
