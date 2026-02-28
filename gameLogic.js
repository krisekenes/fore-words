import { ANSWERS } from "./data/answers.js";
import { VALID_GUESSES } from "./data/validGuesses.js";

export const checkWord = (word) => {
  const dict = VALID_GUESSES[word.length];
  return dict ? dict.has(word) : false;
};

export const pickWord = (length, theme = "classic") => {
  const pool = ANSWERS[theme];
  const list = pool?.[length] || ANSWERS.classic[length] || ANSWERS.classic[5];
  return list[Math.floor(Math.random() * list.length)];
};

export const getScoreName = (score, par) => {
  const diff = score - par;
  if (score === 1) return { name: "ACE!", color: "#FFD700" };
  if (diff <= -3) return { name: "Albatross", color: "#E8B4F8" };
  if (diff === -2) return { name: "Eagle", color: "#FFD700" };
  if (diff === -1) return { name: "Birdie", color: "#4CAF50" };
  if (diff === 0) return { name: "Par", color: "#8BA89A" };
  if (diff === 1) return { name: "Bogey", color: "#D4956A" };
  if (diff === 2) return { name: "Double Bogey", color: "#C0392B" };
  return { name: `+${diff}`, color: "#8B0000" };
};

export const HANDICAP_BONUS = (handicap) => {
  if (handicap >= 20) return 3;
  if (handicap >= 12) return 2;
  if (handicap >= 5) return 1;
  return 0;
};

export const evaluateGuess = (guess, answer) => {
  const result = Array(guess.length).fill("absent");
  const answerChars = [...answer];
  const guessChars = [...guess];

  // First pass: correct positions
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = "correct";
      answerChars[i] = null;
      guessChars[i] = null;
    }
  }
  // Second pass: present but wrong position
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === null) continue;
    const idx = answerChars.indexOf(guessChars[i]);
    if (idx !== -1) {
      result[i] = "present";
      answerChars[idx] = null;
    }
  }
  return result;
};
