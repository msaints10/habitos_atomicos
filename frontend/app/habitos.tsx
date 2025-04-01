import { Habito } from "../features/habito/habitoSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  marcarHabitoCompletadoThunk,
  fetchHabitosThunk,
  agregarHabitoThunk,
} from "@/features/habito/habitoSlice";
import { AppState, AppDispatch } from "@/Redux/store";
import { useState } from "react";

type HabitosProps = {
  habitos: Habito[];
};

const handleMarcarHabitoCompletado = async (
  dispatch: AppDispatch,
  habitoId: string,
  token: string
) => {
  dispatch(marcarHabitoCompletadoThunk({ habitoId, token }));
  if (token) {
    dispatch(fetchHabitosThunk(token));
  }
};

export default function Habitos({ habitos }: HabitosProps) {
  const dispatch = useDispatch<AppDispatch>();
  const estatus = useSelector((state: AppState) => state.habito.estatus);
  const error = useSelector((state: AppState) => state.habito.error);
  const usuario = useSelector((state: AppState) => state.usuario.usuario);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const calcularProgreso = (dias: number): number => {
    return Math.min((dias / 66) * 100, 100);
  };

  const handleAgregarHabito = async () => {
    if (titulo && descripcion) {
      dispatch(
        agregarHabitoThunk({
          titulo,
          descripcion,
          token: usuario ? usuario.toString() : "",
        })
      );
      setTitulo("");
      setDescripcion("");
      dispatch(fetchHabitosThunk(usuario ? usuario.toString() : ""));
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Hábitos</h1>
      <ul className="space-y-4">
        {habitos.length > 0 ? (
          habitos.map((habito: Habito) => (
            <li key={habito._id} className="flex items-center justify-between">
              <span>{habito.titulo}</span>
              <div className="flex items-center space-x-2">
                <progress
                  className="w-24"
                  value={calcularProgreso(habito.dias)}
                  max="100"
                ></progress>
                <button
                  className="px-2 py-2 text-sm text-white bg-blue-500 rounded"
                  onClick={() =>
                    handleMarcarHabitoCompletado(
                      dispatch,
                      habito._id,
                      usuario ? usuario.toString() : ""
                    )
                  }
                >
                  {estatus[habito._id] === "loading"
                    ? "Procesando..."
                    : "Marcar como completado"}
                </button>
                {estatus[habito._id] === "failed" && (
                  <span className="text-red-500 text-sm">
                    {error[habito._id]}
                  </span>
                )}
                {estatus[habito._id] === "success" && (
                  <span className="text-green-500 text-sm">
                    Hábito marcado como completado
                  </span>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No hay hábitos disponibles</li>
        )}
      </ul>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-black">Agregar Nuevo Hábito</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Titulo
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            title="Titulo del nuevo hábito"
            placeholder="Ingrese el título del hábito"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            value={descripcion}
            title="Descripción del nuevo hábito"
            placeholder="Ingrese la descripción del hábito"
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
        <button
          onClick={handleAgregarHabito}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
