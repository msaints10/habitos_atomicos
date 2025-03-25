import { Habito } from "../features/habito/habitoSlice";
import { useSelector, useDispatch } from "react-redux";
import { marcarHabitoCompletadoThunk, fetchHabitosThunk } from "@/features/habito/habitoSlice";
import { AppState, AppDispatch } from "@/Redux/store";

type HabitosProps = {
  habitos: Habito[];
};

const handleMarcarHabitoCompletado = async (dispatch: AppDispatch, habitoId: string) => {
  dispatch(marcarHabitoCompletadoThunk(habitoId));
  dispatch(fetchHabitosThunk());
};

export default function Habitos({ habitos }: HabitosProps) {
  const dispatch = useDispatch<AppDispatch>();
  const estatus = useSelector((state: AppState) => state.habito.estatus);
  const error = useSelector((state: AppState) => state.habito.error);

  const calcularProgreso = (dias: number) : number => {
    return Math.min((dias/66)*100, 100);
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Hábitos</h1>
      <ul className="space-y-4">
        {habitos.map((habito: Habito) => (
          <li key={habito._id} className="flex items-center justify-between">
            <span>{habito.titulo}</span>
            <div className="flex items-center space-x-2">
              <progress className="w-24" value={calcularProgreso(habito.dias)} max="100"></progress>
              <button className="px-2 py-2 text-sm text-white bg-blue-500 rounded" onClick={() => handleMarcarHabitoCompletado(dispatch, habito._id)}>
                {estatus[habito._id] === "loading" ? "Procesando..." : "Marcar como completado"}
              </button>
              {estatus[habito._id] === "failed" && <span className="text-red-500 text-sm">{error[habito._id]}</span>}
              {estatus[habito._id] === "success" && <span className="text-green-500 text-sm">Hábito marcado como completado</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
