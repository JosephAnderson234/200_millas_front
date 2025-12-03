import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    producto_id: string;
    local_id: string;
    name: string;
    price: number;
    quantity: number;
}

interface OrderStore {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getTotalItems: () => number;
}

export const useOrderStore = create(
    persist<OrderStore>(
        (set, get) => ({
            cart: [],
            
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find(i => i.id === item.id);
                
                if (existingItem) {
                    return {
                        cart: state.cart.map(i => 
                            i.id === item.id 
                                ? { ...i, quantity: i.quantity + 1 } 
                                : i
                        )
                    };
                }
                
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                };
            }),
            
            removeFromCart: (id) => set((state) => ({
                cart: state.cart.filter(item => item.id !== id)
            })),
            
            updateQuantity: (id, quantity) => set((state) => {
                if (quantity <= 0) {
                    return { cart: state.cart.filter(item => item.id !== id) };
                }
                
                return {
                    cart: state.cart.map(item => 
                        item.id === id 
                            ? { ...item, quantity } 
                            : item
                    )
                };
            }),
            
            clearCart: () => set({ cart: [] }),
            
            getTotal: () => {
                const state = get();
                return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            
            getTotalItems: () => {
                const state = get();
                return state.cart.reduce((total, item) => total + item.quantity, 0);
            }
        }),
        {
            name: "order-storage",
        }
    )
);
