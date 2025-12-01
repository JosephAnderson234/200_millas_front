import Api from "./api";
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    User,
    ChangePasswordRequest
} from "../interfaces/auth";

export interface GetUserResponse {
    message: string;
    usuario: User;
}

export interface UpdateUserRequest {
    nombre?: string;
    contrasena?: string;
}

export interface UpdateUserResponse {
    message: string;
    usuario: User;
    campos_cambiados: string[];
}

export interface ChangePasswordResponse {
    message: string;
}

class AuthService {
    /**
     * Inicia sesión de usuario
     */
    async login(data: LoginRequest) {
        const api = await Api.getInstance("users");
        return api.post<LoginRequest, LoginResponse>(data, {
            url: "/users/login"
        });
    }

    /**
     * Registra un nuevo usuario
     */
    async register(data: RegisterRequest) {
        const api = await Api.getInstance("users");
        return api.post<RegisterRequest, RegisterResponse>(data, {
            url: "/users/register"
        });
    }

    /**
     * Obtiene el perfil del usuario autenticado
     */
    async getMe() {
        const api = await Api.getInstance("users");
        return api.get<void, GetUserResponse>({
            url: "/users/me"
        });
    }

    /**
     * Actualiza el perfil del usuario autenticado
     */
    async updateMe(data: UpdateUserRequest) {
        const api = await Api.getInstance("users");
        return api.put<UpdateUserRequest, UpdateUserResponse>(data, {
            url: "/users/me"
        });
    }

    /**
     * Cambia la contraseña del usuario autenticado
     */
    async changePassword(data: ChangePasswordRequest) {
        const api = await Api.getInstance("users");
        return api.post<ChangePasswordRequest, ChangePasswordResponse>(data, {
            url: "/users/password/change"
        });
    }

    /**
     * Elimina la cuenta del usuario autenticado
     */
    async deleteMe() {
        const api = await Api.getInstance("users");
        return api.delete({
            url: "/users/me"
        });
    }
}

// Exportar instancia única del servicio
const authService = new AuthService();
export default authService;

// Exportar funciones individuales para compatibilidad con código existente
export const login = (data: LoginRequest) => authService.login(data);
export const register = (data: RegisterRequest) => authService.register(data);
export const getMe = () => authService.getMe();
export const updateMe = (data: UpdateUserRequest) => authService.updateMe(data);
export const changePassword = (data: ChangePasswordRequest) => authService.changePassword(data);
export const deleteMe = () => authService.deleteMe();
