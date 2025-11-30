import Api from "./api";
import { isMockEnabled } from "../config/mockConfig";
import {
    findMockUser,
    registerMockUser,
    getMockUserProfile,
    updateMockUserPassword,
    updateMockUserProfile
} from "./mockData/auth.mock";
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
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Iniciando sesión con datos mockeados");
            
            return new Promise<{ data: LoginResponse }>((resolve, reject) => {
                setTimeout(() => {
                    const user = findMockUser(data.correo, data.contrasena);
                    
                    if (user) {
                        resolve({
                            data: {
                                token: user.token,
                                expires: new Date(Date.now() + 3600000).toISOString(),
                                correo: user.correo,
                                role: user.role
                            }
                        });
                    } else {
                        reject(new Error("Credenciales incorrectas"));
                    }
                }, 800);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("users");
        return api.post<LoginRequest, LoginResponse>(data, {
            url: "/users/login"
        });
    }

    /**
     * Registra un nuevo usuario
     */
    async register(data: RegisterRequest) {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Registrando usuario con datos mockeados");
            
            return new Promise<{ data: RegisterResponse & { token?: string; role?: string } }>(
                (resolve, reject) => {
                    setTimeout(() => {
                        try {
                            const newUser = registerMockUser(data);
                            resolve({
                                data: {
                                    message: "Usuario registrado",
                                    correo: newUser.correo,
                                    token: newUser.token,
                                    role: newUser.role
                                }
                            });
                        } catch (error) {
                            reject(error);
                        }
                    }, 1000);
                }
            );
        }

        // Llamada real a la API
        const api = await Api.getInstance("users");
        return api.post<RegisterRequest, RegisterResponse>(data, {
            url: "/users/register"
        });
    }

    /**
     * Obtiene el perfil del usuario autenticado
     */
    async getMe() {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Obteniendo perfil de usuario mockeado");
            
            return new Promise<{ data: GetUserResponse }>((resolve, reject) => {
                setTimeout(() => {
                    // Simular obtener token del header (en mock usamos un token fijo)
                    const mockToken = "mock-token-cliente-12345";
                    const user = getMockUserProfile(mockToken);
                    
                    if (user) {
                        resolve({
                            data: {
                                message: "Usuario encontrado",
                                usuario: user
                            }
                        });
                    } else {
                        reject(new Error("Usuario no encontrado"));
                    }
                }, 400);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("users");
        return api.get<void, GetUserResponse>({
            url: "/users/me"
        });
    }

    /**
     * Actualiza el perfil del usuario autenticado
     */
    async updateMe(data: UpdateUserRequest) {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Actualizando perfil de usuario mockeado");
            
            return new Promise<{ data: UpdateUserResponse }>((resolve, reject) => {
                setTimeout(() => {
                    try {
                        // En mock, usamos un correo fijo
                        const mockEmail = "juan.cliente@200millas.com";
                        const updatedUser = updateMockUserProfile(mockEmail, data);
                        
                        const camposCambiados = Object.keys(data);
                        
                        resolve({
                            data: {
                                message: "Usuario actualizado correctamente",
                                usuario: updatedUser,
                                campos_cambiados: camposCambiados
                            }
                        });
                    } catch (error) {
                        reject(error);
                    }
                }, 600);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("users");
        return api.put<UpdateUserRequest, UpdateUserResponse>(data, {
            url: "/users/me"
        });
    }

    /**
     * Cambia la contraseña del usuario autenticado
     */
    async changePassword(data: ChangePasswordRequest) {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Cambiando contraseña con datos mockeados");
            
            return new Promise<{ data: ChangePasswordResponse }>((resolve, reject) => {
                setTimeout(() => {
                    try {
                        // En mock, usamos un correo fijo
                        const mockEmail = "juan.cliente@200millas.com";
                        updateMockUserPassword(
                            mockEmail,
                            data.contrasena_actual,
                            data.contrasena_nueva
                        );
                        
                        resolve({
                            data: {
                                message: "Contraseña actualizada correctamente"
                            }
                        });
                    } catch (error) {
                        reject(error);
                    }
                }, 700);
            });
        }

        // Llamada real a la API
        const api = await Api.getInstance("users");
        return api.post<ChangePasswordRequest, ChangePasswordResponse>(data, {
            url: "/users/password/change"
        });
    }

    /**
     * Elimina la cuenta del usuario autenticado
     */
    async deleteMe() {
        // Si está habilitado el modo mock, devolver datos mockeados
        if (isMockEnabled()) {
            console.log("🎭 [MOCK] Eliminando cuenta de usuario mockeado");
            
            return new Promise<{ data: { message: string } }>((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: {
                            message: "Usuario eliminado correctamente"
                        }
                    });
                }, 500);
            });
        }

        // Llamada real a la API
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
