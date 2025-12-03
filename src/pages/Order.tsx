/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useOrderStore } from '@store/useOrderStore';

const Order = () => {
    const navigate = useNavigate();
    const { cart, getTotal, updateQuantity, removeFromCart, clearCart } = useOrderStore();

    const total = getTotal();

    const handleCreateOrder = () => {
        // TODO: Implement actual order creation API call
        const orderId = Math.floor(Math.random() * 10000);
        clearCart();
        navigate(`/order-status/${orderId}`);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <main className="grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl text-black mb-4">Tu pedido está vacío</h2>
                        <button
                            onClick={() => navigate('/menu')}
                            className="text-primary hover:underline"
                        >
                            Volver a la carta
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
            <main className="grow pt-24 pb-12 px-4 container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-black mb-8">Resumen del Pedido</h1>

                <div className="bg-surface rounded-lg p-6 border border-gray-800 mb-8">
                    {cart.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0">
                            <div className="flex-1">
                                <h3 className="text-black font-bold">{item.name}</h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-x border-gray-300 font-bold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            <p className="text-primary font-bold">S/ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-xl text-white font-bold">Total</span>
                        <span className="text-2xl text-primary font-bold">S/ {total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate('/menu')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded hover:border-gray-400 transition-colors"
                    >
                        Seguir Pidiendo
                    </button>
                    <button
                        onClick={handleCreateOrder}
                        className="px-8 py-3 bg-primary text-white font-bold rounded hover:bg-primary-hover transition-colors uppercase tracking-widest"
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Order;