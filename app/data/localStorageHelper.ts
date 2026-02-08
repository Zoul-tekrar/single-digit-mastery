"use client";
import { RefObject } from "react";
import { EquationStats } from "../addition/types/equationStats";
import { generateAllSingleDigitEquations } from "./additionData";

const STORAGE_KEY = "allEquations_v1";

export function saveEquations(entries: [string, EquationStats][]) {
  const jsonStringify = JSON.stringify(entries);
  localStorage.setItem(STORAGE_KEY, jsonStringify);
}

export function loadEquations(): Map<string, EquationStats> {
  const raw = localStorage.getItem(STORAGE_KEY);
  let jsonToObject;
  if (raw) {
    jsonToObject = new Map<string, EquationStats>(
      JSON.parse(raw) as [string, EquationStats][],
    );
  }
  if (!raw) return generateAllSingleDigitEquations();
  try {
    return jsonToObject;
  } catch {
    throw Error("Couldn't load");
  }
}
