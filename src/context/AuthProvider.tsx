import { useUserStore } from "@store/useUserStore";
import { useTokenStore } from "@store/useTokenStore";
import { AuthContext } from "./context";
import { useEffect, type ReactNode } from "react";
import Api from "@services/api";
import type { LoginRequest, RegisterRequest } from "@interfaces/auth";
import { login as loginService, register as registerService } from "@services/auth";

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
        const response = await loginService(data);
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
        await registerService(data);
        // Auto-login logic is handled in the component or we can do it here if we want
        // For now, just register.
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        // Implement if there's a /me endpoint, otherwise rely on stored user
        // For this refactor, we'll keep it simple as per example
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