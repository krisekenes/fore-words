// Course profiles and hole generation for replayability.
// Each course defines a difficulty distribution; holes are randomized each session.

// Par assignment by word length — non-linear to reflect that shorter words
// give less information per guess, making them proportionally harder.
// 4 and 5 letter words share par 4; longer words scale from there.
export const PAR_BY_LENGTH = {
  4: 4,
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
  "Augusta National": [
    "Tea Olive", "Pink Dogwood", "Flowering Peach", "Flowering Crab Apple",
    "Magnolia", "Juniper", "Pampas", "Yellow Jasmine", "Carolina Cherry",
    "Camellia", "White Dogwood", "Golden Bell", "Azalea", "Chinese Fir",
    "Firethorn", "Redbud", "Nandina", "Holly",
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
  "Augusta National": [5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
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

export const MASTERS_COURSE = {
  "Augusta National": {
    description: "18 holes of championship-level word golf",
    color: "#0a3d1a",
  },
};

// Themed display names and descriptions per theme × course.
// Keys are theme identifiers; inner keys match COURSES course names.
export const THEMED_COURSES = {
  sports: {
    "The Links":    { displayName: "The Practice Range", description: "Warm up your swing with common sports terms" },
    "Pine Valley":  { displayName: "Championship Lane", description: "Mid-level athletic vocabulary for contenders" },
    "Royal Dunes":  { displayName: "The Grand Slam", description: "Elite sports words — only MVPs finish under par" },
  },
  geography: {
    "The Links":    { displayName: "The Lowlands", description: "Gentle terrain for beginning explorers" },
    "Pine Valley":  { displayName: "Mountain Pass", description: "Navigate trickier landforms and place names" },
    "Royal Dunes":  { displayName: "The Summit", description: "Peak-level geography — unforgiving and remote" },
  },
  nature: {
    "The Links":    { displayName: "Meadow Creek", description: "Easy flora and fauna to get you started" },
    "Pine Valley":  { displayName: "The Canopy", description: "Deeper into the wilderness with tougher words" },
    "Royal Dunes":  { displayName: "Wildfire Ridge", description: "Harsh elements and rare natural phenomena" },
  },
  animals: {
    "The Links":    { displayName: "The Watering Hole", description: "Friendly creatures everyone knows" },
    "Pine Valley":  { displayName: "Wolf Trail", description: "Track down trickier species and breeds" },
    "Royal Dunes":  { displayName: "The Lion's Den", description: "Only apex wordsmiths survive this habitat" },
  },
  food: {
    "The Links":    { displayName: "The Pantry", description: "Everyday ingredients and kitchen staples" },
    "Pine Valley":  { displayName: "The Bistro", description: "A more refined palate of culinary terms" },
    "Royal Dunes":  { displayName: "The Michelin Star", description: "Rare dishes and gourmet vocabulary" },
  },
  appliances: {
    "The Links":    { displayName: "The Workbench", description: "Common tools and household gadgets" },
    "Pine Valley":  { displayName: "The Power Grid", description: "Intermediate devices and mechanical terms" },
    "Royal Dunes":  { displayName: "Mission Control", description: "Advanced engineering and high-tech systems" },
  },
  arts: {
    "The Links":    { displayName: "The Sketch Pad", description: "Basic art terms and creative fundamentals" },
    "Pine Valley":  { displayName: "The Gallery", description: "A curated collection of artistic vocabulary" },
    "Royal Dunes":  { displayName: "The Masterpiece", description: "Only virtuosos can decode these works" },
  },
  music: {
    "The Links":    { displayName: "The Open Mic", description: "Casual musical terms for any audience" },
    "Pine Valley":  { displayName: "The Concert Hall", description: "Richer compositions and instrumental words" },
    "Royal Dunes":  { displayName: "The Symphony", description: "A grand finale of complex musical terms" },
  },
  latin: {
    "The Links":    { displayName: "The Forum", description: "Common English words with Latin roots" },
    "Pine Valley":  { displayName: "The Colosseum", description: "Sturdier Latin-derived vocabulary" },
    "Royal Dunes":  { displayName: "The Pantheon", description: "Venerable words from the deepest roots" },
  },
  science: {
    "The Links":    { displayName: "The Lab Bench", description: "Introductory science terms and elements" },
    "Pine Valley":  { displayName: "The Research Wing", description: "Intermediate experiments and compounds" },
    "Royal Dunes":  { displayName: "The Reactor", description: "Advanced science — handle with caution" },
  },
  movies: {
    "The Links":    { displayName: "The Audition", description: "Blockbuster terms everyone recognizes" },
    "Pine Valley":  { displayName: "The Director's Cut", description: "Behind-the-scenes cinema vocabulary" },
    "Royal Dunes":  { displayName: "The Premiere", description: "Red-carpet words for true cinephiles" },
  },
  books: {
    "The Links":    { displayName: "The First Chapter", description: "Approachable literary terms for new readers" },
    "Pine Valley":  { displayName: "The Library", description: "A deeper shelf of literary vocabulary" },
    "Royal Dunes":  { displayName: "The Archives", description: "Rare editions and obscure literary words" },
  },
  experimental: {
    "The Links":    { displayName: "The Prototype", description: "Test basic features in a safe environment" },
    "Pine Valley":  { displayName: "Beta Chamber", description: "Mid-level experiments with new mechanics" },
    "Royal Dunes":  { displayName: "The Accelerator", description: "Push experimental features to the limit" },
  },
};

export function getThemedCourse(courseName, theme) {
  return THEMED_COURSES[theme]?.[courseName] || null;
}

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
