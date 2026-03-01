import { useState } from "react";
import { BADGES, RARITY_COLORS, RARITY_GLOW } from "../data/badges.js";

function formatEarnedDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function TrophyCabinet({ profile }) {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const earnedMap = new Map((profile.badges || []).map(b => [b.id, b]));

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
      }}>
        {BADGES.map(badge => {
          const earned = earnedMap.get(badge.id);
          const rarityColor = RARITY_COLORS[badge.rarity];

          return (
            <div
              key={badge.id}
              onClick={earned ? () => setSelectedBadge({ badge, earned }) : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 4px",
                borderRadius: "10px",
                border: earned ? `1px solid ${rarityColor}` : "1px solid rgba(255,255,255,0.06)",
                background: earned ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                boxShadow: earned ? RARITY_GLOW[badge.rarity] : "none",
                cursor: earned ? "pointer" : "default",
                filter: earned ? "none" : "grayscale(1)",
                opacity: earned ? 1 : 0.3,
                transition: "opacity 0.2s",
              }}
            >
              <span style={{ fontSize: "28px", lineHeight: 1 }}>{badge.icon}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "8px",
                letterSpacing: "0.5px",
                color: earned ? rarityColor : "#6a7a6e",
                textAlign: "center",
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                padding: "0 2px",
              }}>
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {selectedBadge && (
        <div
          onClick={() => setSelectedBadge(null)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 14, 10, 0.85)",
            backdropFilter: "blur(4px)",
            borderRadius: "10px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#1a211a",
              border: `2px solid ${RARITY_COLORS[selectedBadge.badge.rarity]}`,
              borderRadius: "16px",
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: RARITY_GLOW[selectedBadge.badge.rarity],
              maxWidth: "240px",
              width: "90%",
            }}
          >
            <div style={{ fontSize: "48px", lineHeight: 1, marginBottom: "10px" }}>
              {selectedBadge.badge.icon}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "2px",
              color: RARITY_COLORS[selectedBadge.badge.rarity],
              marginBottom: "6px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              {selectedBadge.badge.rarity}
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#E8E0D0",
              marginBottom: "8px",
            }}>
              {selectedBadge.badge.name}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#8BA89A",
              marginBottom: "14px",
              lineHeight: 1.5,
            }}>
              {selectedBadge.badge.desc}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "#6a7a6e",
              marginBottom: "18px",
            }}>
              Earned {formatEarnedDate(selectedBadge.earned.earnedAt)}
            </div>
            <button
              onClick={() => setSelectedBadge(null)}
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                padding: "8px 24px",
                color: "#8BA89A",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "2px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
