"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHabitosThunk } from "@/features/habito/habitoSlice";
import { AppState, AppDispatch } from "../Redux/store";
import Habitos from "@/app/habitos";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const habitosData = useSelector((state: AppState) => state.habito.habitos);
  useEffect(() => {
    dispatch(fetchHabitosThunk());
  }, [dispatch]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Habitos habitos={habitosData} />
    </div>
  );
}
