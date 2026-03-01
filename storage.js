const STORAGE_KEY = "forewords_profile";

const DEFAULT_PROFILE = {
  handicap: 10,
  rounds: [],
  hasSeenWelcome: false,
  badges: [],
};

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function markWelcomeSeen() {
  const profile = loadProfile();
  profile.hasSeenWelcome = true;
  saveProfile(profile);
}

export function saveHandicap(handicap) {
  const profile = loadProfile();
  profile.handicap = handicap;
  saveProfile(profile);
}

export function saveRound({ course, scores, holes, theme, gameMode }) {
  const profile = loadProfile();
  const totalPar = holes.reduce((s, h) => s + h.par, 0);
  const totalScore = scores.reduce((s, v) => s + v, 0);
  const aces = scores.filter((s) => s === 1).length;

  profile.rounds.push({
    course,
    date: new Date().toISOString(),
    totalScore,
    totalPar,
    vsPar: totalScore - totalPar,
    scores: [...scores],
    holes: holes.map((h) => ({ par: h.par, wordLength: h.wordLength })),
    aces,
    theme: theme || "classic",
    gameMode: gameMode || "standard",
    holeCount: holes.length,
  });

  // Keep last 50 rounds to avoid bloating localStorage
  if (profile.rounds.length > 50) {
    profile.rounds = profile.rounds.slice(-50);
  }

  saveProfile(profile);
}

export function saveBadges(newBadgeIds) {
  const profile = loadProfile();
  const now = new Date().toISOString();
  const existingIds = new Set(profile.badges.map(b => b.id));
  for (const id of newBadgeIds) {
    if (!existingIds.has(id)) profile.badges.push({ id, earnedAt: now });
  }
  saveProfile(profile);
}

const GAME_STATE_KEY = "forewords_gamestate";

export function saveGameState(state) {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch {
    // silently fail
  }
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(GAME_STATE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    // Validate required fields exist
    if (!state.selectedCourse || !Array.isArray(state.holes) || !Array.isArray(state.guesses) || !state.answer) {
      return null;
    }
    return state;
  } catch {
    return null;
  }
}

export function clearGameState() {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch {
    // silently fail
  }
}

export function getStats(profile) {
  const { rounds } = profile;
  if (rounds.length === 0) {
    return {
      roundsPlayed: 0,
      avgVsPar: 0,
      bestVsPar: null,
      totalAces: 0,
      totalHolesPlayed: 0,
      birdieOrBetter: 0,
    };
  }

  const avgVsPar =
    rounds.reduce((s, r) => s + r.vsPar, 0) / rounds.length;

  const bestRound = rounds.reduce((best, r) =>
    r.vsPar < best.vsPar ? r : best
  );

  const totalAces = rounds.reduce((s, r) => s + (r.aces || 0), 0);
  const totalHolesPlayed = rounds.reduce((s, r) => s + r.scores.length, 0);

  let birdieOrBetter = 0;
  for (const round of rounds) {
    for (let i = 0; i < round.scores.length; i++) {
      const holePar = round.holes[i]?.par;
      if (holePar && round.scores[i] < holePar) {
        birdieOrBetter++;
      }
    }
  }

  return {
    roundsPlayed: rounds.length,
    avgVsPar: Math.round(avgVsPar * 10) / 10,
    bestVsPar: bestRound.vsPar,
    totalAces,
    totalHolesPlayed,
    birdieOrBetter,
  };
}
