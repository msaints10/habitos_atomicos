import { configureStore } from "@reduxjs/toolkit";
import habitoReducer from "../features/habito/habitoSlice";
import usuarioReducer from "../features/usuario/usuarioSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        habito: habitoReducer,
        usuario: usuarioReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];