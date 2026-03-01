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

// Keyboard adjacency for spatial blending (includes diagonals across rows)
const KEYBOARD_NEIGHBORS = {
  Q: ["W","A","S"],             W: ["Q","E","A","S","D"],       E: ["W","R","S","D","F"],
  R: ["E","T","D","F","G"],     T: ["R","Y","F","G","H"],       Y: ["T","U","G","H","J"],
  U: ["Y","I","H","J","K"],     I: ["U","O","J","K","L"],       O: ["I","P","K","L"],
  P: ["O","L"],
  A: ["Q","W","S","Z","X"],     S: ["Q","W","E","A","D","Z","X","C"], D: ["W","E","R","S","F","X","C","V"],
  F: ["E","R","T","D","G","C","V","B"], G: ["R","T","Y","F","H","V","B","N"], H: ["T","Y","U","G","J","B","N","M"],
  J: ["Y","U","I","H","K","N","M"], K: ["U","I","O","J","L","M"], L: ["I","O","P","K"],
  Z: ["A","S","X"],             X: ["A","S","D","Z","C"],       C: ["S","D","F","X","V"],
  V: ["D","F","G","C","B"],     B: ["F","G","H","V","N"],       N: ["G","H","J","B","M"],
  M: ["H","J","K","N"],
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

  // Remove letters from absentSet that turned out to be correct/present
  // (handles duplicate letters: e.g., guessing "LLAMA" when answer has one L)
  for (const letter of knownLetters) {
    absentSet.delete(letter);
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
  const raw = {};
  for (const [letter, count] of Object.entries(freq)) {
    raw[letter] = count / max;
  }

  // Spatial blending: smooth values across keyboard neighbors
  const SELF_WEIGHT = 0.6;
  const blended = {};
  for (const [letter, value] of Object.entries(raw)) {
    const neighbors = KEYBOARD_NEIGHBORS[letter] || [];
    const neighborAvg = neighbors.length > 0
      ? neighbors.reduce((sum, n) => sum + (raw[n] || 0), 0) / neighbors.length
      : 0;
    blended[letter] = SELF_WEIGHT * value + (1 - SELF_WEIGHT) * neighborAvg;
  }

  // Re-normalize blended values
  const blendMax = Math.max(...Object.values(blended));
  if (blendMax === 0) return null;
  const heatmap = {};
  for (const [letter, val] of Object.entries(blended)) {
    heatmap[letter] = val / blendMax;
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
