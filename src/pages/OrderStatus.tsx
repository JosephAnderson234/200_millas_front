import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ordersService from '@services/orders.service';
import type { GetOrderStatusResponse } from '@services/orders.service';
import { motion, AnimatePresence } from 'framer-motion';

const OrderStatus = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState<GetOrderStatusResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    
    // Obtener local_id del state o localStorage
    const localId = location.state?.localId || localStorage.getItem('current_local_id');

    useEffect(() => {
        if (!orderId || !localId) {
            setError('Información del pedido incompleta');
            setLoading(false);
            return;
        }

        const fetchOrderStatus = async (isAutoRefresh = false) => {
            try {
                if (isAutoRefresh) {
                    setIsRefreshing(true);
                } else {
                    setLoading(true);
                }
                setError(null);
                const response = await ordersService.getOrderStatus({
                    local_id: localId,
                    pedido_id: orderId
                });
                setOrderStatus(response);
            } catch (err) {
                console.error('Error fetching order status:', err);
                if (!isAutoRefresh) {
                    setError('No se pudo cargar el estado del pedido');
                }
            } finally {
                setLoading(false);
                setIsRefreshing(false);
            }
        };

        fetchOrderStatus(false);
        
        // Actualizar cada 30 segundos
        const interval = setInterval(() => fetchOrderStatus(true), 30000);
        
        return () => clearInterval(interval);
    }, [orderId, localId]);

    const handleConfirmOrder = async () => {
        if (!orderId) return;
        
        try {
            setIsConfirming(true);
            await ordersService.confirmOrder({
                order_id: orderId,
                empleado_id: '' // El backend puede ignorar este campo para clientes
            });
            setConfirmSuccess(true);
            
            // Opcional: mostrar mensaje y redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/my-orders');
            }, 2000);
        } catch (err) {
            console.error('Error confirming order:', err);
            alert('No se pudo confirmar el pedido. Por favor, intenta de nuevo.');
        } finally {
            setIsConfirming(false);
        }
    };

    const getStepsFromStatus = (estado: string) => {
        const currentState = estado.toLowerCase();
        
        return [
            { 
                status: 'Procesando', 
                completed: true,
                current: currentState === 'procesando'
            },
            { 
                status: 'Preparando', 
                completed: ['preparando', 'pedido_en_camino', 'entregado'].includes(currentState),
                current: currentState === 'preparando'
            },
            { 
                status: 'En Camino', 
                completed: ['pedido_en_camino', 'entregado'].includes(currentState),
                current: currentState === 'pedido_en_camino'
            },
            { 
                status: 'Entregado', 
                completed: currentState === 'entregado',
                current: currentState === 'entregado'
            },
        ];
    };

    const getProgressPercentage = (estado: string) => {
        const currentState = estado.toLowerCase();
        switch (currentState) {
            case 'procesando': return 25;
            case 'preparando': return 50;
            case 'pedido_en_camino': return 75;
            case 'entregado': return 100;
            case 'cancelado': return 0;
            default: return 0;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary">
                <Header />
                <motion.main 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-grow pt-24 pb-12 px-4 container mx-auto flex items-center justify-center"
                >
                    <div className="text-center">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="rounded-full h-16 w-16 border-b-2 border-primary mx-auto"
                        />
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-text-light"
                        >
                            Cargando estado del pedido...
                        </motion.p>
                    </div>
                </motion.main>
                <Footer />
            </div>
        );
    }

    if (error || !orderStatus) {
        return (
            <div className="min-h-screen flex flex-col bg-secondary">
                <Header />
                <motion.main 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-grow pt-24 pb-12 px-4 container mx-auto max-w-2xl"
                >
                    <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-center py-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-6xl mb-4"
                        >
                            ⚠️
                        </motion.div>
                        <h2 className="text-2xl font-bold text-text mb-4">
                            {error || 'No se pudo cargar el estado del pedido'}
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/my-orders')}
                            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition-colors"
                        >
                            Ver Mis Pedidos
                        </motion.button>
                    </motion.div>
                </motion.main>
                <Footer />
            </div>
        );
    }

    const steps = getStepsFromStatus(orderStatus.estado);
    const progressPercentage = getProgressPercentage(orderStatus.estado);
    const isCancelled = orderStatus.estado.toLowerCase() === 'cancelado';
    const isDelivered = orderStatus.estado.toLowerCase() === 'entregado';

    return (
        <div className="min-h-screen flex flex-col bg-secondary">
            <Header />
            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow pt-24 pb-12 px-4 container mx-auto max-w-2xl"
            >
                {/* Indicador de actualización */}
                <AnimatePresence>
                    {isRefreshing && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-20 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span className="text-sm">Actualizando...</span>
                        </motion.div>
                    )}
                    
                    {/* Notificación de éxito al confirmar */}
                    {confirmSuccess && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3"
                        >
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="text-2xl"
                            >
                                ✓
                            </motion.span>
                            <div>
                                <p className="font-bold">¡Pedido Confirmado!</p>
                                <p className="text-sm">Gracias por tu confirmación</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold text-text mb-2">Estado del Pedido</h1>
                    <p className="text-primary text-xl">#{orderId?.slice(0, 8)}</p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isCancelled ? (
                        <motion.div
                            key="cancelled"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-surface rounded-lg p-8 border border-red-300 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="text-red-500 text-6xl mb-4"
                            >
                                ✕
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-red-600 mb-4"
                            >
                                Pedido Cancelado
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-text-light mb-6"
                            >
                                Este pedido ha sido cancelado
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/menu')}
                                className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary-hover transition-colors"
                            >
                                Hacer Nuevo Pedido
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-surface rounded-lg p-8 border border-gray-200 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="h-full bg-primary"
                                />
                            </div>

                            <div className="space-y-8 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>

                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                        className="flex items-start gap-6"
                                    >
                                        <motion.div 
                                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                                                step.completed
                                                    ? 'bg-primary border-primary text-white'
                                                    : 'bg-white border-gray-300 text-gray-400'
                                            } ${step.current ? 'ring-4 ring-primary ring-opacity-30' : ''}`}
                                            animate={step.current ? {
                                                scale: [1, 1.1, 1],
                                            } : {}}
                                            transition={step.current ? {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            } : {}}
                                        >
                                            <AnimatePresence mode="wait">
                                                {step.completed ? (
                                                    <motion.svg
                                                        key="check"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </motion.svg>
                                                ) : (
                                                    <motion.span
                                                        key="number"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="text-sm font-bold"
                                                    >
                                                        {index + 1}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                        <div className="flex-grow pt-1">
                                            <h3 className={`text-lg font-bold ${
                                                step.current 
                                                    ? 'text-primary' 
                                                    : step.completed 
                                                    ? 'text-green-600' 
                                                    : 'text-gray-500'
                                            }`}>
                                                {step.status}
                                                {step.current && (
                                                    <motion.span 
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="ml-2 inline-flex items-center"
                                                    >
                                                        <motion.span
                                                            animate={{ opacity: [1, 0.5, 1] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                            className="text-sm"
                                                        >
                                                            (Actual)
                                                        </motion.span>
                                                    </motion.span>
                                                )}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 pt-6 border-t border-gray-200 text-center"
                            >
                                <p className="text-text-light text-sm mb-4 flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        🔄
                                    </motion.span>
                                    El estado se actualiza automáticamente cada 30 segundos
                                </p>
                                
                                {/* Botón de confirmar pedido cuando está entregado */}
                                {isDelivered && !confirmSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                        className="mt-6 pt-6 border-t border-gray-200"
                                    >
                                        <p className="text-text mb-4 font-medium">
                                            ¿Ya recibiste tu pedido?
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleConfirmOrder}
                                            disabled={isConfirming}
                                            className={`px-8 py-3 rounded-lg font-bold transition-all ${
                                                isConfirming
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                            {isConfirming ? (
                                                <span className="flex items-center gap-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                    />
                                                    Confirmando...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <span>✓</span>
                                                    Confirmar Recepción del Pedido
                                                </span>
                                            )}
                                        </motion.button>
                                        <p className="text-xs text-text-light mt-3">
                                            Al confirmar, estás indicando que recibiste tu pedido satisfactoriamente
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center mt-12 space-x-4"
                >
                    <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                        <Link
                            to="/my-orders"
                            className="text-primary hover:underline font-medium"
                        >
                            Ver Mis Pedidos
                        </Link>
                    </motion.span>
                    <span className="text-gray-400">|</span>
                    <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                        <Link
                            to="/"
                            className="text-primary hover:underline font-medium"
                        >
                            Volver al Inicio
                        </Link>
                    </motion.span>
                </motion.div>
            </motion.main>
            <Footer />
        </div>
    );
};

export default OrderStatus;