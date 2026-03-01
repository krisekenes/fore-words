import { ANSWERS } from "./answers.js";

export const DAILY_COURSE_NAME = "Daily Challenge";
export const DAILY_PAR = 14; // 4+4+6 for lengths 4,5,7

const PAR_BY_LENGTH = { 4: 4, 5: 4, 7: 6 };
const DAILY_LENGTHS = [4, 5, 7];
const DAILY_HOLE_NAMES = ["Morning Tee", "The Turn", "The Gauntlet"];

// Fast, deterministic seeded RNG (mulberry32)
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// "2026-03-01" — used for storage comparisons
export function getDailyStorageDate() {
  return new Date().toISOString().slice(0, 10);
}

// "MARCH 1" — used for display
export function getDailyDisplayDate() {
  return new Date()
    .toLocaleDateString("en-US", { month: "long", day: "numeric" })
    .toUpperCase();
}

// Returns { holes, words } — deterministic for today's date.
// Same result for every call on the same calendar day.
export function getDailyHolesAndWords() {
  const rng = mulberry32(getDailySeed());

  const holes = DAILY_LENGTHS.map((wordLength, i) => ({
    num: i + 1,
    par: PAR_BY_LENGTH[wordLength],
    wordLength,
    name: DAILY_HOLE_NAMES[i],
  }));

  const words = DAILY_LENGTHS.map((length) => {
    const list = ANSWERS.classic[length];
    return list[Math.floor(rng() * list.length)];
  });

  return { holes, words };
}
