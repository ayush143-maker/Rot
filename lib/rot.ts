// the whole biology of the site. client-side only — every function that
// touches localStorage is guarded, and nothing here runs during SSR.

export type Stage = "alive" | "aging" | "decay" | "dead";

export const LIFE_SPAN_MS = 150_000; // 150 seconds of life
export const TICK_MS = 250;
export const IDLE_AFTER_MS = 6_000; // six seconds without attention
export const NEGLECT_ACCEL = 4; // time runs ×4 when unattended

export const KEYS = {
  birth: "rot:birth",
  deaths: "rot:deaths",
  resurrections: "rot:resurrections",
  marks: "rot:marks",
  cod: "rot:cod", // internal: persists cause of death across reloads
} as const;

export function stageOf(decay: number): Stage {
  if (decay >= 1) return "dead";
  if (decay >= 0.6) return "decay";
  if (decay >= 0.3) return "aging";
  return "alive";
}

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // private mode, quota, whatever. the organism lives in memory instead.
  }
}

export function readInt(key: string, fallback = 0): number {
  const raw = safeGet(key);
  if (raw === null) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function writeInt(key: string, value: number): void {
  safeSet(key, String(value));
}

export function readStr(key: string): string {
  return safeGet(key) ?? "";
}

export function writeStr(key: string, value: string): void {
  safeSet(key, value);
}

export function readMarks(): string[] {
  const raw = safeGet(KEYS.marks);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function writeMarks(marks: string[]): void {
  safeSet(KEYS.marks, JSON.stringify(marks));
}

export function formatAge(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export function formatDate(ts: number): string {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()} · ${p(
    d.getHours()
  )}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
