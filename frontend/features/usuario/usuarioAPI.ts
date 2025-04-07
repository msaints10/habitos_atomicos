export const fetchRegistroUsuario =  async (username: string, password: string) => {
    const response = await fetch('https://backend-swart-eight-45.vercel.app/api/usuarios/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
    });
    if (!response.ok) {
        throw new Error('Error al registrar el usuario');
    }
    return response;
};

export const fetchLoginUsuario = async (username: string, password: string) => {
    const response = await fetch('https://backend-swart-eight-45.vercel.app/api/usuarios/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username, "password": password }),
    });
    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }
    return response;
};