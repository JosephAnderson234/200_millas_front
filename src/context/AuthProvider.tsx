import { useUserStore } from "@store/useUserStore";
import { useTokenStore } from "@store/useTokenStore";
import { AuthContext } from "./context";
import { useEffect, type ReactNode } from "react";
import Api from "@services/api";
import type { LoginRequest, RegisterRequest } from "@interfaces/auth";
import authService from "@services/auth.service";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { token, setToken } = useTokenStore();
    const { user, setUser } = useUserStore();


    useEffect(() => {
        // Synchronize token with Api instance
        Api.getInstance("default").then(
            () => Api.setGlobalToken(token)
        );
    }, [token]);

    const login = async (data: LoginRequest) => {
        const response = await authService.login(data);
        if (response.data.token) {
            setToken(response.data.token);
            setUser({
                nombre: response.data.correo.split('@')[0], // Fallback name
                correo: response.data.correo,
                role: response.data.role
            });
        }
    };

    const register = async (data: RegisterRequest) => {
        const response = await authService.register(data);
        // Si el registro devuelve token, auto-login
        if (response.data.token) {
            setToken(response.data.token);
            setUser({
                nombre: data.nombre,
                correo: response.data.correo,
                role: response.data.role || data.role
            });
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const response = await authService.getMe();
            if (response.data.usuario) {
                setUser(response.data.usuario);
            }
        } catch (error) {
            console.error("Error al refrescar usuario:", error);
            // Si falla, mantener el usuario actual o hacer logout
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!token,
            login,
            register,
            logout,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};