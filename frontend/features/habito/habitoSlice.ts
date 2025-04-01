import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHabitos, marcarHabitoCompletado, fetchAgregarHabito } from './habitoAPI';

export type Habito = {
    _id: string;
    titulo: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
    dias: number;
    iniciadoEn: string;
    ultimaActualizacion: string;
    ultimoMarcado: string;
}

export type marcarHabitoCompletadoThunkParams = {
    habitoId: string;
    token: string;
}

export type agregarHabitoThunkParams = {
    titulo: string;
    descripcion: string;
    token: string;
}

type HabitoState = {
    habitos: Habito[];
    estatus: Record<string, "idle" | "loading" | "success" | "failed">;
    error: Record<string, string | null>;
}

const initialState: HabitoState = {
    habitos: [],
    estatus: {},
    error: {}
}

export const fetchHabitosThunk = createAsyncThunk("habito/fetchHabitos", async (token: string, {rejectWithValue}) => {
    const response = await fetchHabitos(token);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Error al obtener los hábitos");
    }
    return responseJson;
});

export const marcarHabitoCompletadoThunk = createAsyncThunk("habito/marcarHabitoCompletado", async ({habitoId, token}: marcarHabitoCompletadoThunkParams, {rejectWithValue}) => {
    const respMarcado =  await marcarHabitoCompletado(habitoId, token);
    if (respMarcado.code != 1) { // Error -999 o Hábito reiniciado 0
        return rejectWithValue(respMarcado.mensaje);
    }
    return respMarcado.mensaje;
});

export const agregarHabitoThunk = createAsyncThunk("habito/agregarHabito", async ({titulo, descripcion, token}: agregarHabitoThunkParams, {rejectWithValue}) => {
    const response = await fetchAgregarHabito(titulo, descripcion, token);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Error al agregar el hábito");
    } else if (responseJson.message.toString() === "Error al guardar el hábito") {
        return rejectWithValue(responseJson.message); // Error
    } else {
        return responseJson.token; // Hábito agregado correctamente
    }
});

const habitoSlice = createSlice({
    name: "habito",
    initialState,
    reducers: {
        setHabitos: (state, action) => {
            state.habitos = action.payload;
        },
        addHabito: (state, action) => {
            state.habitos.push(action.payload);
        },
        removeHabito: (state, action) => {
            state.habitos = state.habitos.filter(habito => habito._id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchHabitosThunk.fulfilled, (state, action) => {
            state.habitos = action.payload;
        });
        builder.addCase(marcarHabitoCompletadoThunk.fulfilled, (state, action) => {
            state.estatus[action.meta.arg.habitoId] = "success";
            state.error[action.meta.arg.habitoId] = null;
        });
        builder.addCase(marcarHabitoCompletadoThunk.rejected, (state, action) => {
            state.estatus[action.meta.arg.habitoId] = "failed";
            state.error[action.meta.arg.habitoId] = action.payload as string;
        });
        builder.addCase(marcarHabitoCompletadoThunk.fulfilled, (state, action) => {
            state.habitos.push(action.payload);
        });
    }
});

export const { setHabitos, addHabito, removeHabito } = habitoSlice.actions;
export default habitoSlice.reducer;