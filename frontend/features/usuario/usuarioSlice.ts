import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRegistroUsuario, fetchLoginUsuario } from './usuarioAPI';

interface usuarioThunk {
    username: string;
    password: string;
}

export type usuario = {
    token: string;
}

export type usuarioState = {
    usuario: usuario | null;
    estatus: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initialState: usuarioState = {
    usuario: null,
    estatus: "idle",
    error: null
}

export const fetchRegistroUsuarioThunk = createAsyncThunk("usuario/fetchRegistroUsuario", async ({username, password}: usuarioThunk, {rejectWithValue}) => {
    const response = await fetchRegistroUsuario(username, password);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Error al registrar el usuario");
    } else if (responseJson.mensaje.toString() === "Usuario Registrado Correctamente") {
        return responseJson.mensaje; // Usuario registrado correctamente
    } else {
        return rejectWithValue(responseJson.mensaje); // Error
    }
});

export const fetchLoginUsuarioThunk = createAsyncThunk("usuario/fetchLoginUsuario", async ({username, password}: usuarioThunk, {rejectWithValue}) => {
    const response = await fetchLoginUsuario(username, password);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Error al iniciar sesión");
    } else if (responseJson.mensaje.toString() === "Inicio de Sesión Exitóso") {
        return responseJson.mensaje; // Usuario login correctamente
    } else {
        return rejectWithValue(responseJson.mensaje); // Error
    }
});

const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        addUsuario: (state, action) => {
            state.usuario = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchRegistroUsuarioThunk.fulfilled, (state, action) => {
            state.estatus = "success";
            state.usuario = null;
            state.error = action.payload as string;
            alert("Usuario registrado correctamente");
        });
        builder.addCase(fetchRegistroUsuarioThunk.rejected, (state, action) => {
            state.estatus = "failed";
            state.usuario = null;
            state.error = action.payload as string;
            alert("No es posible registrar el usuario, intente nuevamente");
        });
        builder.addCase(fetchLoginUsuarioThunk.fulfilled, (state, action) => {
            state.estatus = "success";
            state.error = null;
            state.error = action.payload as string;
        });
        builder.addCase(fetchLoginUsuarioThunk.rejected, (state, action) => {
            state.estatus = "failed";
            state.usuario = null;
            state.error = action.payload as string;
            alert("No es posible iniciar sesión, intente nuevamente");
        });
    }
});

export const { addUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
