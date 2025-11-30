import type { User } from "../../interfaces/auth";

// Usuarios mockeados para desarrollo
export const MOCK_USERS = [
    {
        correo: "juan.cliente@200millas.com",
        contrasena: "password123",
        nombre: "Juan Pérez Cliente",
        role: "Cliente",
        token: "mock-token-cliente-12345"
    },
    {
        correo: "maria.gerente@200millas.com",
        contrasena: "password123",
        nombre: "María González Gerente",
        role: "Gerente",
        token: "mock-token-gerente-67890"
    },
    {
        correo: "test@test.com",
        contrasena: "test123",
        nombre: "Usuario Test",
        role: "Cliente",
        token: "mock-token-test-11111"
    }
];

// Almacenamiento temporal de usuarios registrados en sesión
const sessionUsers: typeof MOCK_USERS = [];

export const findMockUser = (correo: string, contrasena: string) => {
    // Buscar primero en usuarios de sesión
    const sessionUser = sessionUsers.find(
        u => u.correo === correo && u.contrasena === contrasena
    );
    if (sessionUser) return sessionUser;

    // Luego buscar en usuarios predefinidos
    return MOCK_USERS.find(
        u => u.correo === correo && u.contrasena === contrasena
    );
};

export const findMockUserByEmail = (correo: string) => {
    const sessionUser = sessionUsers.find(u => u.correo === correo);
    if (sessionUser) return sessionUser;
    
    return MOCK_USERS.find(u => u.correo === correo);
};

export const registerMockUser = (userData: {
    nombre: string;
    correo: string;
    contrasena: string;
    role: string;
}) => {
    // Verificar si el usuario ya existe
    if (findMockUserByEmail(userData.correo)) {
        throw new Error("El correo ya está registrado");
    }

    // Crear nuevo usuario
    const newUser = {
        ...userData,
        token: `mock-token-${Date.now()}`
    };

    sessionUsers.push(newUser);
    return newUser;
};

export const getMockUserProfile = (token: string): User | null => {
    // Buscar usuario por token
    const sessionUser = sessionUsers.find(u => u.token === token);
    if (sessionUser) {
        return {
            nombre: sessionUser.nombre,
            correo: sessionUser.correo,
            role: sessionUser.role
        };
    }

    const predefinedUser = MOCK_USERS.find(u => u.token === token);
    if (predefinedUser) {
        return {
            nombre: predefinedUser.nombre,
            correo: predefinedUser.correo,
            role: predefinedUser.role
        };
    }

    return null;
};

export const updateMockUserPassword = (
    correo: string,
    contrasenaActual: string,
    contrasenaNueva: string
) => {
    const user = findMockUser(correo, contrasenaActual);
    
    if (!user) {
        throw new Error("Contraseña actual incorrecta");
    }

    // Actualizar contraseña
    user.contrasena = contrasenaNueva;
    return true;
};

export const updateMockUserProfile = (
    correo: string,
    updates: Partial<{ nombre: string; contrasena: string }>
) => {
    const sessionUser = sessionUsers.find(u => u.correo === correo);
    const predefinedUser = MOCK_USERS.find(u => u.correo === correo);
    
    const user = sessionUser || predefinedUser;
    
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (updates.nombre) user.nombre = updates.nombre;
    if (updates.contrasena) user.contrasena = updates.contrasena;

    return {
        nombre: user.nombre,
        correo: user.correo,
        role: user.role
    };
};
