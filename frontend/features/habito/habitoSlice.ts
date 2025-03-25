import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHabitos, marcarHabitoCompletado } from './habitoAPI';

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

export const fetchHabitosThunk = createAsyncThunk("habito/fetchHabitos", async () => {
    return await fetchHabitos();
});

export const marcarHabitoCompletadoThunk = createAsyncThunk("habito/marcarHabitoCompletado", async (habitoId: string, {rejectWithValue}) => {
    const respMarcado =  await marcarHabitoCompletado(habitoId);
    if (respMarcado.code != 1) { // Error -999 o Hábito reiniciado 0
        return rejectWithValue(respMarcado.mensaje);
    }
    return respMarcado.mensaje;
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
            state.estatus[action.meta.arg] = "success";
            state.error[action.meta.arg] = null;
        });
        builder.addCase(marcarHabitoCompletadoThunk.rejected, (state, action) => {
            state.estatus[action.meta.arg] = "failed";
            state.error[action.meta.arg] = action.payload as string;
        });
    }
});

export const { setHabitos, addHabito, removeHabito } = habitoSlice.actions;
export default habitoSlice.reducer;