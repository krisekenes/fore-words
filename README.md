# FORE Words Golf Club

A word-guessing game that combines Wordle-style mechanics with the structure and scoring of a round of golf. Built as a single React component — no backend, no build step, just drop it in and play.

## What It Does

You play 9 holes of golf, but instead of hitting a ball, you guess words. Each hole gives you a hidden word to solve. Type letters, hit Enter, and get color-coded feedback — green for correct letter in the correct spot, yellow for right letter wrong spot, gray for not in the word. The number of guesses it takes you is your score for that hole, measured against par just like real golf.

The twist: word length changes hole to hole. Some holes are short par-3s with 4-letter words. Others are grueling par-5s with 7-letter words. Your total score across all 9 holes determines how you did — birdies, bogeys, and everything in between.

### Three Courses

- **The Links** — A balanced seaside course for all skill levels. Mix of 4–7 letter words with fair pars.
- **Pine Valley** — A championship-level course that leans toward longer words and tighter pars.
- **Royal Dunes** — An elite course with mostly 6–7 letter words. Punishing.

### Scoring

Standard golf scoring applies:

| Term | Meaning |
|------|---------|
| Ace | Solved in 1 guess |
| Eagle | 2 under par |
| Birdie | 1 under par |
| Par | Expected number of guesses |
| Bogey | 1 over par |
| Double Bogey | 2 over par |

A handicap system gives bonus guesses on harder holes (longer words relative to par), keeping things fair without making it easy.

### Features

- 3D flip animations on tile reveals with staggered timing
- Full on-screen keyboard with color state tracking across guesses
- Toast notifications for invalid words and game events
- Scorecard that updates as you play, showing per-hole results and running total
- Country club visual aesthetic — dark greens, gold accents, serif typography
- Baked-in English dictionary (~5,500 words across 4–7 letters) for guess validation
- Curated answer word lists with thematic variety (nature, golf, language, objects)

## Why It Was Built

Two reasons.

**The game design question:** Wordle is a single puzzle. What happens if you string nine of them together with variable difficulty and a scoring system that rewards consistency? Golf is the obvious metaphor — both are solo activities where you're playing against a standard, not an opponent. The par system maps naturally: a 4-letter word in 3 guesses is birdie-level, a 7-letter word in 6 is scrambling for bogey. The course structure gives progression and narrative to what would otherwise be disconnected puzzles.

**The technical question:** Can a complete, polished game with animations, state management, keyboard handling, and dictionary validation live in a single React component with zero dependencies beyond React itself? No router, no state library, no CSS framework, no API calls. The answer is yes — the game uses only React hooks and inline styles, split across a handful of focused modules.

## Technical Notes

- **Modular structure**: `ForeWords.jsx` orchestrates state and screen routing; data, logic, screens, and styles are in separate modules
- **No network calls**: All word validation is local via baked-in `Set` lookups (instant, works offline)
- **No external dependencies**: Only uses React hooks (`useState`, `useEffect`, `useCallback`, `useRef`)
- **Answer words are curated**: The words you solve are hand-picked for interest and variety. The guess dictionary is broader to accept any reasonable English word a player might try.
- **State machine**: Game flows through `menu → playing → (hole won/lost) → scorecard → menu` with clean transitions

## Usage

Import and render the component in any React app:

```jsx
import ForeWords from './ForeWords';

function App() {
  return <ForeWords />;
}
```

Or drop it into any environment that supports JSX — Claude Artifacts, CodeSandbox, Vite, Next.js, etc.

## File Structure

```
ForeWords.jsx            # Main: state, game actions, screen routing, keyboard listener
gameLogic.js             # Pure functions: checkWord, pickWord, evaluateGuess, getScoreName, HANDICAP_BONUS
constants.js             # KEYBOARD_ROWS, TILE_COLORS
styles.js                # styles object + globalStyles CSS string
data/
  answers.js             # Curated answer words by length
  validGuesses.js        # Valid guess dictionaries (Sets by length)
  courses.js             # 3 courses, 9 holes each
screens/
  MenuScreen.jsx         # Menu with handicap selector
  CourseSelect.jsx       # Course selection cards
  PlayingScreen.jsx      # Grid, tiles, keyboard, toast, score overlay, mini scorecard
  RoundEnd.jsx           # Final scorecard with score table
README.md                # This file
```

No build system, bundler, or config required — just import `ForeWords` into any React environment.
