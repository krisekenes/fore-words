export const RARITY_COLORS = {
  bronze:   "#cd7f32",
  silver:   "#C0C0C0",
  gold:     "#c9a94e",
  platinum: "#E8E0D0",
};

export const RARITY_GLOW = {
  bronze:   "0 0 14px rgba(205,127,50,0.55)",
  silver:   "0 0 14px rgba(192,192,192,0.45)",
  gold:     "0 0 20px rgba(201,169,78,0.65)",
  platinum: "0 0 24px rgba(232,224,208,0.75), 0 0 48px rgba(201,169,78,0.25)",
};

export const BADGES = [
  {
    id: "opening_drive",
    name: "Opening Drive",
    desc: "Complete your first round ever.",
    icon: "⛳",
    rarity: "bronze",
    check(roundResult, profile) {
      return profile.rounds.length === 1;
    },
  },
  {
    id: "quick_nine",
    name: "Quick Nine",
    desc: "Complete a 3-hole Quick round.",
    icon: "⚡",
    rarity: "bronze",
    check(roundResult) {
      return roundResult.holeCount === 3;
    },
  },
  {
    id: "theme_night",
    name: "Theme Night",
    desc: "Complete a themed round.",
    icon: "🎨",
    rarity: "bronze",
    check(roundResult) {
      return roundResult.theme && roundResult.theme !== "classic";
    },
  },
  {
    id: "lab_rat",
    name: "Lab Rat",
    desc: "Complete a Labs / experimental round.",
    icon: "🧪",
    rarity: "bronze",
    check(roundResult) {
      return roundResult.gameMode === "experimental";
    },
  },
  {
    id: "first_birdie",
    name: "First Birdie",
    desc: "Score below par on any hole.",
    icon: "🐦",
    rarity: "bronze",
    check(roundResult) {
      return roundResult.scores.some((s, i) => s < roundResult.holes[i].par);
    },
  },
  {
    id: "eagle_eye",
    name: "Eagle Eye",
    desc: "Score 2 under par or better on any hole.",
    icon: "🦅",
    rarity: "silver",
    check(roundResult) {
      return roundResult.scores.some((s, i) => s <= roundResult.holes[i].par - 2);
    },
  },
  {
    id: "birdie_blitz",
    name: "Birdie Blitz",
    desc: "Score under par on 3 or more holes in a single round.",
    icon: "🔥",
    rarity: "silver",
    check(roundResult) {
      const underPar = roundResult.scores.filter((s, i) => s < roundResult.holes[i].par).length;
      return underPar >= 3;
    },
  },
  {
    id: "royal_survivor",
    name: "Royal Survivor",
    desc: "Complete a round on Royal Dunes.",
    icon: "🏜️",
    rarity: "silver",
    check(roundResult) {
      return roundResult.course === "Royal Dunes";
    },
  },
  {
    id: "grand_tour",
    name: "Grand Tour",
    desc: "Complete at least one round on all 3 main courses.",
    icon: "🗺️",
    rarity: "silver",
    check(roundResult, profile) {
      const mainCourses = ["The Links", "Pine Valley", "Royal Dunes"];
      const playedCourses = new Set(profile.rounds.map(r => r.course));
      return mainCourses.every(c => playedCourses.has(c));
    },
  },
  {
    id: "scratch_golfer",
    name: "Scratch Golfer",
    desc: "Finish a round at exactly par.",
    icon: "✨",
    rarity: "gold",
    check(roundResult) {
      return roundResult.vsPar === 0;
    },
  },
  {
    id: "club_champion",
    name: "Club Champion",
    desc: "Finish a round under par.",
    icon: "🏆",
    rarity: "gold",
    check(roundResult) {
      return roundResult.vsPar < 0;
    },
  },
  {
    id: "hole_in_one",
    name: "Hole in One",
    desc: "Solve a hole on your very first guess.",
    icon: "💫",
    rarity: "gold",
    check(roundResult) {
      return roundResult.aces > 0;
    },
  },
  {
    id: "masters_champion",
    name: "Masters Champion",
    desc: "Complete an 18-hole Masters round.",
    icon: "🌸",
    rarity: "gold",
    check(roundResult) {
      return roundResult.holeCount === 18;
    },
  },
  {
    id: "century_club",
    name: "Century Club",
    desc: "Play 100 total holes across your career.",
    icon: "💯",
    rarity: "gold",
    check(roundResult, profile) {
      const totalHoles = profile.rounds.reduce((s, r) => s + r.scores.length, 0);
      return totalHoles >= 100;
    },
  },
  {
    id: "hat_trick",
    name: "Hat Trick",
    desc: "Earn 3 or more aces across your career.",
    icon: "🎩",
    rarity: "platinum",
    check(roundResult, profile) {
      const totalAces = profile.rounds.reduce((s, r) => s + (r.aces || 0), 0);
      return totalAces >= 3;
    },
  },
  {
    id: "flawless_round",
    name: "Flawless Round",
    desc: "Win every hole in a single round — no score over par.",
    icon: "💎",
    rarity: "platinum",
    check(roundResult) {
      return roundResult.scores.every((s, i) => s <= roundResult.holes[i].par);
    },
  },
];
