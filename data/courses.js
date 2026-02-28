// Course profiles and hole generation for replayability.
// Each course defines a difficulty distribution; holes are randomized each session.

// Par assignment by word length
const PAR_BY_LENGTH = {
  4: [3],
  5: [3, 4],
  6: [4, 5],
  7: [5],
};

// Themed hole name pools per course
const HOLE_NAMES = {
  "The Links": [
    "Opening Drive", "The Pond", "Long Valley", "Dogleg Right", "Short Iron",
    "The Monster", "Blind Approach", "Island Green", "The Closer", "Seaside",
    "Lighthouse", "Tide Pool", "The Narrows", "Cliffside", "Harbor View",
    "Salt Spray", "Gull's Nest", "The Shallows", "Breakers", "Low Tide",
  ],
  "Pine Valley": [
    "Pine Alley", "Needle Drop", "Resin Pot", "Cathedral", "Knothole",
    "The Stump", "Timber Line", "Sap Run", "Bark & Bite", "Root Cellar",
    "Canopy", "Mossy Bank", "The Thicket", "Fallen Oak", "Pinecone",
    "Bear Trail", "Creek Bed", "Ridge Line", "The Clearing", "Old Growth",
  ],
  "Royal Dunes": [
    "Headwind", "The Bunker", "Sahara", "Razor's Edge", "The Abyss",
    "Pot Bunker", "Crosswind", "Dune Ridge", "Glory Road", "Mirage",
    "Sandstorm", "The Wastes", "Scorched", "Oasis", "Camel's Back",
    "Sun Dial", "Dust Devil", "The Gauntlet", "Throne Room", "Final Stand",
  ],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Word length distributions per course (pool of 9 to draw from each session)
const LENGTH_POOLS = {
  "The Links":    [4, 4, 4, 5, 5, 5, 6, 6, 7],
  "Pine Valley":  [5, 5, 5, 6, 6, 6, 6, 7, 7],
  "Royal Dunes":  [5, 6, 6, 6, 7, 7, 7, 7, 7],
};

// Average par for a course (deterministic, for display on cards)
export function getCoursePar(courseName) {
  const lengths = LENGTH_POOLS[courseName];
  // Use midpoint of par range for each hole
  const total = lengths.reduce((s, l) => {
    const pars = PAR_BY_LENGTH[l];
    return s + pars.reduce((a, b) => a + b, 0) / pars.length;
  }, 0);
  return Math.round(total);
}

// Distinct word lengths used by a course (sorted)
export function getCourseLengths(courseName) {
  return [...new Set(LENGTH_POOLS[courseName])].sort((a, b) => a - b);
}

export function generateHoles(courseName) {
  const lengths = shuffle(LENGTH_POOLS[courseName]);
  const names = shuffle(HOLE_NAMES[courseName]);

  return lengths.map((wordLength, i) => ({
    num: i + 1,
    par: pick(PAR_BY_LENGTH[wordLength]),
    wordLength,
    name: names[i],
  }));
}

export const COURSES = {
  "The Links": {
    description: "A classic seaside course for all skill levels",
    color: "#2d5a3d",
  },
  "Pine Valley": {
    description: "A challenging championship course through the pines",
    color: "#1a3a2a",
  },
  "Royal Dunes": {
    description: "An elite links course — only the brave survive",
    color: "#3d2d1a",
  },
};
