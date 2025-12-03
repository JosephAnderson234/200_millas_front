import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ordersService from '@services/orders.service';
import type { OrderHistoryResponse } from '@services/orders.service';
import { motion } from 'framer-motion';

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<OrderHistoryResponse['pedidos']>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await ordersService.getOrderHistory();
                setOrders(response.pedidos);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('No se pudo cargar el historial de pedidos');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getEstadoColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'procesando':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'preparando':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'pedido_en_camino':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'entregado':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelado':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getEstadoLabel = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'procesando':
                return 'Procesando';
            case 'preparando':
                return 'Preparando';
            case 'pedido_en_camino':
                return 'En Camino';
            case 'entregado':
                return 'Entregado';
            case 'cancelado':
                return 'Cancelado';
            default:
                return estado;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary">
                <Header />
                <main className="flex-grow pt-24 pb-12 px-4 container mx-auto flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-text-light">Cargando pedidos...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary">
                <Header />
                <main className="flex-grow pt-24 pb-12 px-4 container mx-auto">
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-text mb-4">{error}</h2>
                        <button
                            onClick={() => navigate('/menu')}
                            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition-colors"
                        >
                            Ir al Menú
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-text">Mis Pedidos</h1>
                    <button
                        onClick={() => navigate('/menu')}
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition-colors"
                    >
                        Hacer Nuevo Pedido
                    </button>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-text mb-4">
                            No tienes pedidos aún
                        </h2>
                        <p className="text-text-light mb-6">
                            ¡Haz tu primer pedido y disfruta de nuestra deliciosa comida!
                        </p>
                        <button
                            onClick={() => navigate('/menu')}
                            className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary-hover transition-colors"
                        >
                            Ver Menú
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.pedido_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-surface rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text mb-1">
                                                Pedido #{order.pedido_id.slice(0, 8)}
                                            </h3>
                                            <p className="text-text-light text-sm">
                                                {formatDate(order.created_at)}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-bold border ${getEstadoColor(order.estado)}`}
                                        >
                                            {getEstadoLabel(order.estado)}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mb-4">
                                        <h4 className="font-semibold text-text mb-2">Productos:</h4>
                                        <ul className="space-y-2">
                                            {order.productos.map((producto, idx) => (
                                                <li key={idx} className="flex justify-between text-text-light">
                                                    <span>
                                                        Producto {producto.producto_id.slice(0, 8)} × {producto.cantidad}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-text-light">Dirección:</span>
                                            <span className="text-text font-medium">{order.direccion}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-text font-semibold text-lg">Total:</span>
                                            <span className="text-primary font-bold text-xl">
                                                S/ {typeof order.costo === 'string' ? parseFloat(order.costo).toFixed(2) : order.costo.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4">
                                        <button
                                            onClick={() => navigate(`/order-status/${order.pedido_id}`, {
                                                state: { localId: order.local_id }
                                            })}
                                            className="flex-1 bg-primary text-white py-2 rounded hover:bg-primary-hover transition-colors"
                                        >
                                            Ver Estado
                                        </button>
                                        {order.estado.toLowerCase() === 'entregado' && (
                                            <button
                                                onClick={() => navigate('/menu')}
                                                className="flex-1 border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition-colors"
                                            >
                                                Volver a Pedir
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default MyOrders;
