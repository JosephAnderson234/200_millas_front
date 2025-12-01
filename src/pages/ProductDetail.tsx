import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProductById } from '@services/product';
import type { Product } from '@interfaces/product';

const ProductDetail = () => {
    const { localId, productId } = useParams<{ localId: string; productId: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!localId || !productId) {
                setError('Parámetros inválidos');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await getProductById(localId, productId);
                // Convertir precio y stock a números
                const normalizedProduct = {
                    ...response.producto,
                    precio: typeof response.producto.precio === 'string' 
                        ? parseFloat(response.producto.precio) 
                        : response.producto.precio,
                    stock: typeof response.producto.stock === 'string' 
                        ? parseInt(response.producto.stock, 10) 
                        : response.producto.stock
                };
                setProduct(normalizedProduct as Product);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('No se pudo cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [localId, productId]);

    const handleAddToCart = () => {
        if (!product) return;
        
        // Aquí puedes implementar la lógica para agregar al carrito
        // Por ahora, redirigimos a la página de pedido
        navigate('/order', { 
            state: { 
                cart: [{ 
                    id: `${product.local_id}-${product.producto_id}`, 
                    name: product.nombre, 
                    price: Number(product.precio), 
                    quantity 
                }] 
            } 
        });
    };

    const increaseQuantity = () => {
        if (product && quantity < Number(product.stock)) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
                <Header />
                <main className="flex-grow pt-24 pb-12 px-4 container mx-auto flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary)] mx-auto"></div>
                        <p className="mt-4 text-[var(--color-text-light)]">Cargando producto...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
                <Header />
                <main className="flex-grow pt-24 pb-12 px-4 container mx-auto">
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                            {error || 'Producto no encontrado'}
                        </h2>
                        <button
                            onClick={() => navigate('/menu')}
                            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:bg-[var(--color-primary-hover)] transition-colors"
                        >
                            Volver al Menú
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto">
                <button
                    onClick={() => navigate('/menu')}
                    className="mb-6 text-[var(--color-primary)] hover:underline flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al Menú
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Imagen del Producto */}
                    <div className="bg-[var(--color-surface)] rounded-lg overflow-hidden shadow-lg">
                        {product.imagen_url ? (
                            <img
                                src={product.imagen_url}
                                alt={product.nombre}
                                className="w-full h-auto object-cover"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400">
                                <span className="text-8xl">🍽️</span>
                            </div>
                        )}
                    </div>

                    {/* Información del Producto */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="mb-4">
                                <span className="inline-block bg-[var(--color-primary)] text-white px-4 py-1 rounded-full text-sm font-bold mb-2">
                                    {product.categoria}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
                                {product.nombre}
                            </h1>
                            <p className="text-[var(--color-text-light)] text-lg mb-6 leading-relaxed">
                                {product.descripcion}
                            </p>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-bold text-[var(--color-primary)]">
                                    S/ {Number(product.precio).toFixed(2)}
                                </span>
                                {Number(product.stock) > 0 ? (
                                    <span className="text-green-600 font-semibold">
                                        Stock disponible: {Number(product.stock)}
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        Sin stock
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Controles de Cantidad y Agregar al Carrito */}
                        {Number(product.stock) > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-[var(--color-text)] font-semibold">Cantidad:</span>
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button
                                            onClick={decreaseQuantity}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-6 py-2 border-x border-gray-300 font-bold">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={increaseQuantity}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                            disabled={quantity >= Number(product.stock)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[var(--color-primary)] text-white py-4 rounded font-bold text-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                                >
                                    Agregar al Pedido - S/ {(Number(product.precio) * quantity).toFixed(2)}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;
