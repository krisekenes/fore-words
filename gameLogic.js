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

export const computeHeatmap = (wordLength, guesses) => {
  if (guesses.length === 0) return null;

  const dict = VALID_GUESSES[wordLength];
  if (!dict) return null;

  // Build constraints from guesses
  const correctAt = {};   // position -> letter
  const presentSet = {};  // letter -> Set of positions where it's NOT
  const absentSet = new Set(); // letters known to not be in word
  const knownLetters = new Set(); // letters that are correct or present somewhere

  for (const { word, evaluation } of guesses) {
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const state = evaluation[i];
      if (state === "correct") {
        correctAt[i] = letter;
        knownLetters.add(letter);
      } else if (state === "present") {
        if (!presentSet[letter]) presentSet[letter] = new Set();
        presentSet[letter].add(i);
        knownLetters.add(letter);
      } else {
        // Only mark absent if not also known correct/present
        if (!knownLetters.has(letter)) {
          absentSet.add(letter);
        }
      }
    }
  }

  // Filter remaining words
  const remaining = [];
  for (const w of dict) {
    let valid = true;
    for (const [pos, letter] of Object.entries(correctAt)) {
      if (w[Number(pos)] !== letter) { valid = false; break; }
    }
    if (!valid) continue;
    for (const letter of absentSet) {
      if (w.includes(letter)) { valid = false; break; }
    }
    if (!valid) continue;
    for (const [letter, positions] of Object.entries(presentSet)) {
      if (!w.includes(letter)) { valid = false; break; }
      for (const pos of positions) {
        if (w[pos] === letter) { valid = false; break; }
      }
      if (!valid) break;
    }
    if (valid) remaining.push(w);
  }

  if (remaining.length === 0) return null;

  // Count letter frequencies
  const freq = {};
  for (let c = 65; c <= 90; c++) freq[String.fromCharCode(c)] = 0;
  for (const w of remaining) {
    const seen = new Set();
    for (const ch of w) {
      if (!seen.has(ch)) { freq[ch]++; seen.add(ch); }
    }
  }

  // Normalize to 0-1
  const max = Math.max(...Object.values(freq));
  if (max === 0) return null;
  const heatmap = {};
  for (const [letter, count] of Object.entries(freq)) {
    heatmap[letter] = count / max;
  }
  return heatmap;
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
