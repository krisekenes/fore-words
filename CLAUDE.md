# Fore Words — Project Context

## What Is This?

Wordle-meets-golf word game. Players solve 9 holes of word puzzles per round. Each hole has a different word length (4–7 letters) and par value. Score under par to win. Country club aesthetic.

## Tech Stack

- **Frontend only** — React 19, Vite, vanilla CSS (inline styles + global CSS string)
- **Zero external deps** — only React + ReactDOM
- **No backend, no database, no auth** — fully client-side, offline-capable
- **Persistence:** localStorage for player profile (handicap, round history, stats)
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml`

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## File Map

```
ForeWords.jsx          # Root component — state machine, game orchestration
gameLogic.js           # Pure functions: evaluateGuess, checkWord, pickWord, getScoreName, HANDICAP_BONUS
storage.js             # localStorage persistence: loadProfile, saveHandicap, saveRound, getStats
constants.js           # KEYBOARD_ROWS, TILE_COLORS
styles.js              # Shared inline styles object + globalStyles CSS string (animations, fonts)
main.jsx               # Vite entry point

screens/
  MenuScreen.jsx       # Title, handicap selector, "Select Course" + "My Profile" buttons
  CourseSelect.jsx     # 3 course cards with metadata (par, holes, letter range)
  PlayingScreen.jsx    # Active gameplay: grid, keyboard, mini scorecard, overlays
  RoundEnd.jsx         # Final scorecard table with color-coded scores
  ProfileScreen.jsx    # Player stats (rounds, avg vs par, best, aces) + recent rounds

data/
  courses.js           # PAR_BY_LENGTH, LENGTH_POOLS, HOLE_NAMES, generateHoles(), COURSES
  answers.js           # Curated word lists by length (4: ~140, 5: ~380, 6: ~300, 7: ~200)
  validGuesses.js      # Valid guess dictionaries as Sets (~8,300 total across all lengths)
```

## Game Flow

```
menu → courseSelect → playing → (won|lost per hole) → roundEnd → menu
         ↘ profile ↗
```

State lives in `ForeWords.jsx`. Screen rendered based on `screen` state variable.

## Scoring System

- **Par per word length** (`data/courses.js:PAR_BY_LENGTH`): linear scale, `par = wordLength - 1`
  - 4 letters → Par 3
  - 5 letters → Par 4
  - 6 letters → Par 5
  - 7 letters → Par 6
- **Max guesses** = `par + 2 + HANDICAP_BONUS(handicap)`
- **Handicap bonus** (0–30 range): 0-4→+0, 5-11→+1, 12-19→+2, 20+→+3
- **Score names**: Ace (1), Albatross (-3), Eagle (-2), Birdie (-1), Par (0), Bogey (+1), Double Bogey (+2), +N
- **Failed hole** = `maxGuesses + 1` strokes

## Courses

| Course | Difficulty | Word Lengths | ~Par |
|--------|-----------|-------------|------|
| The Links | Beginner | 4,4,4,5,5,5,6,6,7 | 37 |
| Pine Valley | Intermediate | 5,5,5,6,6,6,6,7,7 | 44 |
| Royal Dunes | Expert | 5,6,6,6,7,7,7,7,7 | 49 |

Each session randomizes hole order and names. Par is deterministic based on word length.

## Conventions

- All styles inline or in `styles.js` — no CSS files
- Fonts: Playfair Display (serif headings), DM Sans (body/UI)
- Colors: dark greens (#141914 bg), gold (#c9a94e accents), cream (#E8E0D0 text)
- Tile animations: 3D flip on reveal (staggered 300ms), pop on type, shake on error
- No TypeScript — plain JSX
- No state management library — useState/useCallback hooks
