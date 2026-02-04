import { RefObject } from "react";
import { EquationStats } from "../addition/types/equationStats";
import { generateAllSingleDigitEquations } from "./additionData";

const STORAGE_KEY = "allEquations_v1";

export function saveEquations(entries: [string, EquationStats][]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function loadEquations(): [string, EquationStats][] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return Array.from(generateAllSingleDigitEquations().entries());
  try {
    return JSON.parse(raw) as [string, EquationStats][];
  } catch {
    throw Error("Couldn't load");
  }
}
