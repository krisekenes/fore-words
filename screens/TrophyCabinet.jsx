import { useState } from "react";
import { BADGES, RARITY_COLORS, RARITY_GLOW } from "../data/badges.js";
import { BadgeIcon } from "./BadgeIcons.jsx";

function formatEarnedDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function TrophyCabinet({ profile }) {
  const [selected, setSelected] = useState(null); // { badge, earned | null }

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
              onClick={() => setSelected({ badge, earned: earned || null })}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 4px",
                borderRadius: "10px",
                border: earned
                  ? `1px solid ${rarityColor}`
                  : "1px solid rgba(255,255,255,0.07)",
                background: earned ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                boxShadow: earned ? RARITY_GLOW[badge.rarity] : "none",
                cursor: "pointer",
                filter: earned ? "none" : "grayscale(1)",
                opacity: earned ? 1 : 0.32,
                transition: "opacity 0.15s, box-shadow 0.15s",
              }}
            >
              <BadgeIcon id={badge.id} color={rarityColor} size={28} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "8px",
                letterSpacing: "0.4px",
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

      {/* Detail modal — earned or locked */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 14, 10, 0.88)",
            backdropFilter: "blur(4px)",
            borderRadius: "10px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#1a211a",
              border: `2px solid ${RARITY_COLORS[selected.badge.rarity]}`,
              borderRadius: "16px",
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: selected.earned ? RARITY_GLOW[selected.badge.rarity] : "none",
              maxWidth: "248px",
              width: "90%",
            }}
          >
            <div style={{
              opacity: selected.earned ? 1 : 0.45,
              filter: selected.earned ? "none" : "grayscale(0.6)",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center",
            }}>
              <BadgeIcon id={selected.badge.id} color={RARITY_COLORS[selected.badge.rarity]} size={52} />
            </div>

            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "2px",
              color: selected.earned ? RARITY_COLORS[selected.badge.rarity] : "#6a7a6e",
              marginBottom: "5px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              {selected.earned ? selected.badge.rarity : "LOCKED"}
            </div>

            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: selected.earned ? "#E8E0D0" : "#8BA89A",
              marginBottom: "8px",
            }}>
              {selected.badge.name}
            </div>

            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#8BA89A",
              marginBottom: selected.earned ? "12px" : "18px",
              lineHeight: 1.5,
            }}>
              {selected.badge.desc}
            </div>

            {selected.earned && (
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "#6a7a6e",
                marginBottom: "18px",
              }}>
                Earned {formatEarnedDate(selected.earned.earnedAt)}
              </div>
            )}

            <button
              onClick={() => setSelected(null)}
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
