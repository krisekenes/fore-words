// Custom SVG badge icons — no emojis.
// Each component takes { color, size } props.

const V = "0 0 32 32"; // shared viewBox

function OpeningDriveIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <ellipse cx="16" cy="27" rx="6" ry="2.5" fill={c} opacity="0.25" />
      <line x1="16" y1="25.5" x2="16" y2="9" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 9 L24 12.5 L16 16" fill={c} />
    </svg>
  );
}

function QuickNineIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M20 3 L10 18 L16.5 18 L12 29 L22 14 L15.5 14 Z" fill={c} />
    </svg>
  );
}

function ThemeNightIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <line x1="23" y1="9" x2="8" y2="24" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M23 3 L24.5 7.5 L29 9 L24.5 10.5 L23 15 L21.5 10.5 L17 9 L21.5 7.5 Z" fill={c} />
      <circle cx="9.5" cy="15" r="1.5" fill={c} opacity="0.55" />
      <circle cx="14" cy="25" r="1" fill={c} opacity="0.4" />
    </svg>
  );
}

function LabRatIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M13 5 L13 14 L7.5 24 Q6.5 27.5 10 27.5 L22 27.5 Q25.5 27.5 24.5 24 L19 14 L19 5"
        stroke={c} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="11.5" y1="5" x2="20.5" y2="5" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20.5 Q11.5 18 16 18 Q20.5 18 22 20.5 L23.5 24 Q24.5 27.5 22 27.5 L10 27.5 Q7.5 27.5 8.5 24 Z"
        fill={c} opacity="0.35" />
      <circle cx="12.5" cy="22" r="1.2" fill={c} opacity="0.7" />
      <circle cx="19" cy="23" r="0.9" fill={c} opacity="0.7" />
    </svg>
  );
}

function FirstBirdieIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      {/* body */}
      <ellipse cx="16" cy="20" rx="6" ry="4" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="1.5" />
      {/* tail */}
      <path d="M22 20 L27 22 L22 23" fill={c} opacity="0.6" />
      {/* wing arching up */}
      <path d="M11 19 Q13 11 19 13 Q21 14 20 19" stroke={c} strokeWidth="1.6" fill={c} fillOpacity="0.25" strokeLinejoin="round" />
      {/* head */}
      <circle cx="11" cy="19" r="3" fill={c} />
      {/* beak */}
      <path d="M8.5 18.5 L5.5 17.5 L8.5 20" fill={c} />
      {/* eye */}
      <circle cx="10" cy="18.5" r="0.9" fill="#141914" />
    </svg>
  );
}

function EagleEyeIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M3 16 Q16 5 29 16 Q16 27 3 16 Z" stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.1" />
      <circle cx="16" cy="16" r="5.5" stroke={c} strokeWidth="1.8" />
      <circle cx="16" cy="16" r="3" fill={c} />
      <circle cx="17.5" cy="14.5" r="1" fill="white" opacity="0.45" />
    </svg>
  );
}

function BirdieBlitzIcon({ color: c, size: s }) {
  // Three birds in V-formation
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      {/* lead bird */}
      <path d="M7 14 Q9.5 9 12 13" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M12 13 Q14.5 9 17 13" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* right wing bird */}
      <path d="M16 20 Q18 16 20 19" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M20 19 Q22 16 24 19" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
      {/* far right */}
      <path d="M21 26 Q22.5 23 24 25.5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M24 25.5 Q25.5 23 27 25.5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function RoyalSurvivorIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M4 24 L4 14 L10 19.5 L16 8 L22 19.5 L28 14 L28 24 Z"
        stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.15" strokeLinejoin="round" />
      <line x1="4" y1="24" x2="28" y2="24" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="15" r="2.2" fill={c} />
      <circle cx="7" cy="22.5" r="1.5" fill={c} opacity="0.7" />
      <circle cx="25" cy="22.5" r="1.5" fill={c} opacity="0.7" />
    </svg>
  );
}

function GrandTourIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <circle cx="16" cy="16" r="12" stroke={c} strokeWidth="1.5" opacity="0.4" />
      {/* N point */}
      <path d="M16 4 L13.5 12 L18.5 12 Z" fill={c} />
      {/* S point */}
      <path d="M16 28 L13.5 20 L18.5 20 Z" fill={c} opacity="0.5" />
      {/* E point */}
      <path d="M28 16 L20 13.5 L20 18.5 Z" fill={c} opacity="0.5" />
      {/* W point */}
      <path d="M4 16 L12 13.5 L12 18.5 Z" fill={c} opacity="0.5" />
      {/* inter-cardinal lines */}
      <line x1="8.1" y1="8.1" x2="9.7" y2="9.7" stroke={c} strokeWidth="1.2" opacity="0.3" />
      <line x1="23.9" y1="8.1" x2="22.3" y2="9.7" stroke={c} strokeWidth="1.2" opacity="0.3" />
      <line x1="8.1" y1="23.9" x2="9.7" y2="22.3" stroke={c} strokeWidth="1.2" opacity="0.3" />
      <line x1="23.9" y1="23.9" x2="22.3" y2="22.3" stroke={c} strokeWidth="1.2" opacity="0.3" />
      <circle cx="16" cy="16" r="2.5" fill={c} />
    </svg>
  );
}

function ScratchGolferIcon({ color: c, size: s }) {
  // 4-pointed star (elongated horizontal+vertical) + 4 small diagonal points
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M16 2 L17.8 13.5 L29 16 L17.8 18.5 L16 30 L14.2 18.5 L3 16 L14.2 13.5 Z" fill={c} />
      <path d="M7.5 7.5 L8.8 11.5 L12.8 12.8 L8.8 14.1 L7.5 18.1 L6.2 14.1 L2.2 12.8 L6.2 11.5 Z" fill={c} opacity="0.45" />
      <path d="M24.5 7.5 L25.8 11.5 L29.8 12.8 L25.8 14.1 L24.5 18.1 L23.2 14.1 L19.2 12.8 L23.2 11.5 Z" fill={c} opacity="0.45" />
    </svg>
  );
}

function ClubChampionIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M10 4 L10 17 Q10 23 16 23 Q22 23 22 17 L22 4 Z"
        stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.15" strokeLinejoin="round" />
      <path d="M10 8 Q5.5 8 5.5 13 Q5.5 17 10 17" stroke={c} strokeWidth="1.8" fill="none" />
      <path d="M22 8 Q26.5 8 26.5 13 Q26.5 17 22 17" stroke={c} strokeWidth="1.8" fill="none" />
      <line x1="16" y1="23" x2="16" y2="27.5" stroke={c} strokeWidth="2" />
      <line x1="11" y1="27.5" x2="21" y2="27.5" stroke={c} strokeWidth="2.2" strokeLinecap="round" />
      {/* 5-pt star in cup */}
      <path d="M16 8 L17.2 11.5 L21 11.5 L18 13.5 L19.2 17 L16 15 L12.8 17 L14 13.5 L11 11.5 L14.8 11.5 Z" fill={c} />
    </svg>
  );
}

function HoleInOneIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      {/* radial burst */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => {
        const r = Math.PI / 180;
        const x1 = 16 + 9 * Math.cos(deg * r);
        const y1 = 16 + 9 * Math.sin(deg * r);
        const x2 = 16 + 14 * Math.cos(deg * r);
        const y2 = 16 + 14 * Math.sin(deg * r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />;
      })}
      {/* golf ball */}
      <circle cx="16" cy="16" r="7.5" fill={c} fillOpacity="0.18" stroke={c} strokeWidth="1.8" />
      {/* dimples */}
      <circle cx="12.5" cy="14" r="1.1" fill={c} opacity="0.55" />
      <circle cx="19.5" cy="14" r="1.1" fill={c} opacity="0.55" />
      <circle cx="16" cy="19" r="1.1" fill={c} opacity="0.55" />
      <circle cx="12.5" cy="19" r="1.1" fill={c} opacity="0.35" />
      <circle cx="19.5" cy="19" r="1.1" fill={c} opacity="0.35" />
      {/* "1" flag pin in center */}
      <line x1="16" y1="10" x2="16" y2="22" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity="0" />
      <text x="16" y="20.5" textAnchor="middle" fill={c} fontSize="9" fontWeight="800" fontFamily="sans-serif">1</text>
    </svg>
  );
}

function MastersChampionIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      {/* left branch */}
      <path d="M16 27 Q9 22 7.5 15 Q6.5 9 11 6" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="9" cy="11" rx="3.5" ry="5" transform="rotate(-35 9 11)" fill={c} fillOpacity="0.45" />
      <ellipse cx="8" cy="18" rx="3.5" ry="5" transform="rotate(-18 8 18)" fill={c} fillOpacity="0.45" />
      <ellipse cx="11.5" cy="23.5" rx="3.5" ry="5" transform="rotate(8 11.5 23.5)" fill={c} fillOpacity="0.45" />
      {/* right branch */}
      <path d="M16 27 Q23 22 24.5 15 Q25.5 9 21 6" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="23" cy="11" rx="3.5" ry="5" transform="rotate(35 23 11)" fill={c} fillOpacity="0.45" />
      <ellipse cx="24" cy="18" rx="3.5" ry="5" transform="rotate(18 24 18)" fill={c} fillOpacity="0.45" />
      <ellipse cx="20.5" cy="23.5" rx="3.5" ry="5" transform="rotate(-8 20.5 23.5)" fill={c} fillOpacity="0.45" />
      {/* ribbon */}
      <path d="M13.5 27 Q16 29 18.5 27" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* center star */}
      <path d="M16 13 L17 16 L20 16 L17.5 17.8 L18.5 21 L16 19.2 L13.5 21 L14.5 17.8 L12 16 L15 16 Z" fill={c} />
    </svg>
  );
}

function CenturyClubIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <path d="M16 3 L28 7.5 L28 18.5 Q28 27 16 30 Q4 27 4 18.5 L4 7.5 Z"
        stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.12" strokeLinejoin="round" />
      <text x="16" y="21.5" textAnchor="middle" fill={c} fontSize="9.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">100</text>
    </svg>
  );
}

function HatTrickIcon({ color: c, size: s }) {
  // Three 5-pointed stars in a triangle arrangement
  function star(cx, cy, r, ir) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? r : ir;
      pts.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
    }
    return pts.join(" ");
  }
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      <polygon points={star(16, 9, 6, 2.5)} fill={c} />
      <polygon points={star(8.5, 22, 5, 2.1)} fill={c} opacity="0.8" />
      <polygon points={star(23.5, 22, 5, 2.1)} fill={c} opacity="0.8" />
    </svg>
  );
}

function FlawlessRoundIcon({ color: c, size: s }) {
  return (
    <svg viewBox={V} width={s} height={s} fill="none">
      {/* outer gem */}
      <path d="M10 6 L22 6 L28 14 L16 29 L4 14 Z" stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.15" strokeLinejoin="round" />
      {/* top facets */}
      <line x1="10" y1="6" x2="16" y2="11" stroke={c} strokeWidth="1" opacity="0.6" />
      <line x1="22" y1="6" x2="16" y2="11" stroke={c} strokeWidth="1" opacity="0.6" />
      <line x1="4" y1="14" x2="16" y2="11" stroke={c} strokeWidth="1" opacity="0.5" />
      <line x1="28" y1="14" x2="16" y2="11" stroke={c} strokeWidth="1" opacity="0.5" />
      {/* girdle */}
      <line x1="4" y1="14" x2="28" y2="14" stroke={c} strokeWidth="1" opacity="0.45" />
      {/* lower facets */}
      <line x1="4" y1="14" x2="16" y2="29" stroke={c} strokeWidth="1" opacity="0.35" />
      <line x1="28" y1="14" x2="16" y2="29" stroke={c} strokeWidth="1" opacity="0.35" />
      <line x1="16" y1="11" x2="16" y2="29" stroke={c} strokeWidth="1" opacity="0.3" />
      {/* mid lower facets */}
      <line x1="10" y1="14" x2="16" y2="29" stroke={c} strokeWidth="0.8" opacity="0.25" />
      <line x1="22" y1="14" x2="16" y2="29" stroke={c} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

const ICON_MAP = {
  opening_drive:    OpeningDriveIcon,
  quick_nine:       QuickNineIcon,
  theme_night:      ThemeNightIcon,
  lab_rat:          LabRatIcon,
  first_birdie:     FirstBirdieIcon,
  eagle_eye:        EagleEyeIcon,
  birdie_blitz:     BirdieBlitzIcon,
  royal_survivor:   RoyalSurvivorIcon,
  grand_tour:       GrandTourIcon,
  scratch_golfer:   ScratchGolferIcon,
  club_champion:    ClubChampionIcon,
  hole_in_one:      HoleInOneIcon,
  masters_champion: MastersChampionIcon,
  century_club:     CenturyClubIcon,
  hat_trick:        HatTrickIcon,
  flawless_round:   FlawlessRoundIcon,
};

export function BadgeIcon({ id, color, size = 32 }) {
  const Component = ICON_MAP[id];
  if (!Component) return null;
  return <Component color={color} size={size} />;
}
