"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitosThunk } from "@/features/habito/habitoSlice";
import { AppState, AppDispatch } from "../Redux/store";
import Habitos from "@/app/habitos";
import { fetchRegistroUsuarioThunk, fetchLoginUsuarioThunk, addUsuario } from "@/features/usuario/usuarioSlice"; 
import { getCookie } from "cookies-next";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habitosData = useSelector((state: AppState) => state.habito.habitos);
  const usuario = useSelector((state: AppState) => state.usuario.usuario);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = getCookie("habitoToken");
    if (token) {
      dispatch(addUsuario(token));
    }
    if (usuario) {
      dispatch(fetchHabitosThunk(usuario.toString()));
    }
  }, [dispatch, usuario]);

  const handleLogin = () => {
    dispatch(fetchLoginUsuarioThunk({ username, password }));
  };

  const handleRegister = () => {
    dispatch(fetchRegistroUsuarioThunk({ username, password }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 sm:p-20 font-sans bg-gray-100">
      {!usuario && (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Inicio de Sesión / Registro</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              title="Nombre de usuario"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              title="Contraseña"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
      {usuario && <Habitos habitos={habitosData} />}
    </div>
  );
}
