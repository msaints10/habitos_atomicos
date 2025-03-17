import { Habito } from "../features/habito/habitoSlice";

type HabitosProps = {
  habitos: Habito[];
};

export default function Habitos({ habitos }: HabitosProps) {
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Hábitos</h1>
      <ul className="space-y-4">
        {habitos.map((habito: Habito) => (
          <li key={habito._id} className="flex items-center justify-between">
            <span>{habito.titulo}</span>
            <div className="flex items-center space-x-2">
              <progress className="w-24" value="70" max="100"></progress>
              <button className="px-2 py-2 text-sm text-white bg-blue-500 rounded">
                Marcar como Completada
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
