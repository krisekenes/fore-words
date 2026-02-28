// Course profiles and hole generation for replayability.
// Each course defines a difficulty distribution; holes are randomized each session.

// Par assignment by word length — scales linearly (wordLength - 1)
// Longer words have larger search spaces and need more guesses to be fair
const PAR_BY_LENGTH = {
  4: 3,
  5: 4,
  6: 5,
  7: 6,
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
  "Morning Tee": [
    "First Light", "Dewy Green", "Sunrise", "The Warm-Up", "Easy Does It",
    "Coffee Cup", "Fresh Start", "Dawn Patrol", "Early Bird", "Day Break",
  ],
  "Midday Sprint": [
    "High Noon", "Fast Track", "The Shortcut", "Double Time", "Quick Draw",
    "Sun Shot", "Half Pace", "The Express", "Dash Point", "Speed Trap",
  ],
  "Sunset Dash": [
    "Last Light", "Golden Hour", "The Closer", "Dusk Drive", "Twilight",
    "Long Shadow", "Afterglow", "The Finisher", "Night Fall", "Final Putt",
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

// Word length distributions per course (pool of 9 to draw from each session)
const LENGTH_POOLS = {
  "The Links":      [4, 4, 4, 5, 5, 5, 6, 6, 7],
  "Pine Valley":    [5, 5, 5, 6, 6, 6, 6, 7, 7],
  "Royal Dunes":    [5, 6, 6, 6, 7, 7, 7, 7, 7],
  "Morning Tee":    [4, 4, 4, 5, 5, 5, 6, 6, 7],
  "Midday Sprint":  [5, 5, 5, 6, 6, 6, 6, 7, 7],
  "Sunset Dash":    [5, 6, 6, 6, 7, 7, 7, 7, 7],
};

// Total par for a course (deterministic, for display on cards)
export function getCoursePar(courseName, holeCount = 9) {
  const lengths = LENGTH_POOLS[courseName];
  if (holeCount >= lengths.length) {
    return lengths.reduce((s, l) => s + PAR_BY_LENGTH[l], 0);
  }
  const avgParPerHole = lengths.reduce((s, l) => s + PAR_BY_LENGTH[l], 0) / lengths.length;
  return Math.round(avgParPerHole * holeCount);
}

// Distinct word lengths used by a course (sorted)
export function getCourseLengths(courseName) {
  return [...new Set(LENGTH_POOLS[courseName])].sort((a, b) => a - b);
}

export function generateHoles(courseName, holeCount = 9) {
  const lengths = shuffle(LENGTH_POOLS[courseName]).slice(0, holeCount);
  const names = shuffle(HOLE_NAMES[courseName]);

  return lengths.map((wordLength, i) => ({
    num: i + 1,
    par: PAR_BY_LENGTH[wordLength],
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

export const QUICK_COURSES = {
  "Morning Tee": {
    description: "A gentle warm-up to start the day",
    color: "#3d4a2d",
  },
  "Midday Sprint": {
    description: "A brisk challenge for your lunch break",
    color: "#2d3a4a",
  },
  "Sunset Dash": {
    description: "A tough sprint before the sun goes down",
    color: "#4a2d3a",
  },
};
