import type { Unit } from "../../types/Weather";
import { getItem, setItem } from "./LocalStorage";

const UNIT_KEY = "weatherUnit";

export function getSavedUnit(): Unit {
  return getItem<Unit>(UNIT_KEY) ?? "metric";
}

export function saveUnit(unit: Unit): void {
  setItem(UNIT_KEY, unit);
}
