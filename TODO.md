# Fore Words — TODO

## Done

### Scoring Rebalance (PR #1)
- Increased par for longer words: 4→3, 5→4, 6→5, 7→6 (linear: wordLength - 1)
- Removed random par ranges; each word length has a single deterministic par

### Player Profile (PR #2)
- localStorage persistence via `storage.js`
- Handicap persists across sessions
- Round history saved (last 50 rounds)
- ProfileScreen with stats grid and recent rounds list
- "MY PROFILE" button on menu

## Future Ideas

- Leaderboards (would need backend)
- Daily challenge mode (same word for everyone)
- Share scorecard (image export or text copy)
- Sound effects (club swing, ball drop)
- Streak tracking (consecutive days played)
- More courses
- Achievements/badges
