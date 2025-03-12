import { configureStore } from "@reduxjs/toolkit";
import habitoReducer from "../features/habito/habitoSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        habito: habitoReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];