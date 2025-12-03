/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useOrderStore } from '@store/useOrderStore';
import ordersService from '@services/orders.service';
import { motion, AnimatePresence } from 'framer-motion';

const Order = () => {
    const navigate = useNavigate();
    const { cart, getTotal, updateQuantity, removeFromCart, clearCart } = useOrderStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [direccion, setDireccion] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);

    const total = getTotal();

    const handleCreateOrder = async () => {
        if (cart.length === 0) return;

        // Validar que todos los items tengan el mismo local_id
        const localIds = [...new Set(cart.map(item => item.local_id))];
        if (localIds.length > 1) {
            setError('No puedes ordenar productos de diferentes locales en un mismo pedido');
            return;
        }

        if (!direccion.trim()) {
            setShowAddressModal(true);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const local_id = cart[0].local_id;
            
            const response = await ordersService.createOrder({
                local_id,
                productos: cart.map(item => ({
                    producto_id: item.producto_id,
                    cantidad: item.quantity
                })),
                costo: total,
                direccion: direccion.trim(),
                estado: 'procesando'
            });

            // Guardar local_id en localStorage para OrderStatus
            localStorage.setItem('current_local_id', local_id);

            clearCart();
            setDireccion('');
            
            navigate(`/order-status/${response.pedido.pedido_id}`, {
                state: { localId: local_id }
            });
        } catch (err) {
            console.error('Error creating order:', err);
            setError('No se pudo crear el pedido. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary">
                <Header />
                <motion.main 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grow flex items-center justify-center"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-6xl mb-4"
                        >
                            🛒
                        </motion.div>
                        <h2 className="text-2xl text-text font-bold mb-4">Tu pedido está vacío</h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/menu')}
                            className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary-hover transition-colors"
                        >
                            Ver Menú
                        </motion.button>
                    </div>
                </motion.main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            <Header />
            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grow pt-24 pb-12 px-4 container mx-auto max-w-4xl"
            >
                <h1 className="text-3xl font-bold text-text mb-8">Resumen del Pedido</h1>

                {/* Alerta de error */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center"
                        >
                            <span>{error}</span>
                            <button
                                onClick={() => setError(null)}
                                className="text-red-700 hover:text-red-900 font-bold"
                            >
                                ✕
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-surface rounded-lg p-6 border border-gray-200 mb-8 shadow-md">
                    {cart.map((item: any, index: number) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0"
                        >
                            <div className="flex-1">
                                <h3 className="text-text font-bold">{item.name}</h3>
                                <p className="text-text-light text-sm">S/ {item.price.toFixed(2)} c/u</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 transition-colors text-text"
                                        >
                                            -
                                        </motion.button>
                                        <span className="px-4 py-1 border-x border-gray-300 font-bold text-text">
                                            {item.quantity}
                                        </span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 transition-colors text-text"
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Eliminar
                                    </motion.button>
                                </div>
                            </div>
                            <p className="text-primary font-bold text-lg">S/ {(item.price * item.quantity).toFixed(2)}</p>
                        </motion.div>
                    ))}

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center"
                    >
                        <span className="text-xl text-text font-bold">Total</span>
                        <span className="text-2xl text-primary font-bold">S/ {total.toFixed(2)}</span>
                    </motion.div>
                </div>

                {/* Campo de dirección */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-surface rounded-lg p-6 border border-gray-200 mb-8 shadow-md"
                >
                    <label htmlFor="direccion" className="block text-text font-bold mb-3">
                        Dirección de Entrega *
                    </label>
                    <input
                        id="direccion"
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Ingresa tu dirección completa"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-text-light text-sm mt-2">
                        Ejemplo: Av. Principal 123, San Isidro, Lima
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-end gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/menu')}
                        className="px-6 py-3 border border-gray-300 text-text bg-white rounded hover:border-gray-400 transition-colors"
                    >
                        Seguir Pidiendo
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                        onClick={handleCreateOrder}
                        disabled={loading}
                        className={`px-8 py-3 font-bold rounded uppercase tracking-widest transition-all ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg'
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                Procesando...
                            </span>
                        ) : (
                            'Confirmar Pedido'
                        )}
                    </motion.button>
                </motion.div>
            </motion.main>

            {/* Modal de dirección requerida */}
            <AnimatePresence>
                {showAddressModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddressModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                className="text-6xl text-center mb-4"
                            >
                                📍
                            </motion.div>
                            <h3 className="text-2xl font-bold text-text text-center mb-4">
                                Dirección Requerida
                            </h3>
                            <p className="text-text-light text-center mb-6">
                                Por favor, ingresa tu dirección de entrega para continuar con el pedido.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowAddressModal(false)}
                                className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-primary-hover transition-colors"
                            >
                                Entendido
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Order;