import { useState, useMemo } from "react";
import { RARITY_COLORS, RARITY_GLOW } from "../data/badges.js";
import { BadgeIcon } from "./BadgeIcons.jsx";

const CONFETTI_COLORS = ["#c9a94e", "#4a7c59", "#E8E0D0", "#8BA89A", "#d4956a", "#e8b4f8", "#FFD700", "#4CAF50"];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function BadgeCelebration({ badges, onAllClaimed }) {
  const [index, setIndex] = useState(0);

  const badge = badges[index];
  if (!badge) return null;
  const rarityColor = RARITY_COLORS[badge.rarity];
  const rarityGlow = RARITY_GLOW[badge.rarity];
  const isPlatinum = badge.rarity === "platinum";

  const confetti = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      top: `${rand(-5, 20)}%`,
      left: `${rand(0, 100)}%`,
      color: CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))],
      width: `${rand(6, 10)}px`,
      height: `${rand(6, 12)}px`,
      duration: `${rand(1.5, 3)}s`,
      delay: `${rand(0, 2)}s`,
    }));
  }, []);

  const handleClaim = () => {
    if (index + 1 < badges.length) {
      setIndex(index + 1);
    } else {
      onAllClaimed();
    }
  };

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(10, 14, 10, 0.88)",
      backdropFilter: "blur(6px)",
    }}>
      {/* Confetti */}
      {confetti.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.width,
            height: p.height,
            background: p.color,
            borderRadius: "2px",
            pointerEvents: "none",
            animation: `confettiFall ${p.duration} ${p.delay} ease-in both`,
          }}
        />
      ))}

      {/* Badge card */}
      <div style={{
        position: "relative",
        zIndex: 501,
        background: "#1a211a",
        border: `2px solid ${rarityColor}`,
        borderRadius: "20px",
        padding: "36px 40px",
        boxShadow: rarityGlow,
        textAlign: "center",
        maxWidth: "320px",
        width: "90%",
        animation: "badgeReveal 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "10px",
          letterSpacing: "3px",
          color: rarityColor,
          marginBottom: "16px",
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
          Achievement Unlocked
        </div>

        <div style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
          animation: "popIn 0.4s 0.2s both",
        }}>
          <BadgeIcon id={badge.id} color={rarityColor} size={72} />
        </div>

        <div style={isPlatinum ? {
          fontFamily: "'Playfair Display', serif",
          fontSize: "26px",
          fontWeight: 700,
          marginBottom: "10px",
          background: "linear-gradient(90deg, #c9a94e 0%, #E8E0D0 30%, #c9a94e 50%, #E8E0D0 70%, #c9a94e 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmer 3s linear infinite",
        } : {
          fontFamily: "'Playfair Display', serif",
          fontSize: "26px",
          fontWeight: 700,
          color: rarityColor,
          marginBottom: "10px",
        }}>
          {badge.name}
        </div>

        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#8BA89A",
          marginBottom: "28px",
          lineHeight: 1.5,
        }}>
          {badge.desc}
        </div>

        <button
          onClick={handleClaim}
          style={{
            background: "linear-gradient(135deg, #c9a94e, #a8893e)",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            color: "#141914",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "3px",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            width: "100%",
          }}
        >
          CLAIM IT!
        </button>

        {badges.length > 1 && (
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: "#6a7a6e",
            marginTop: "14px",
          }}>
            {index + 1} of {badges.length}
          </div>
        )}
      </div>
    </div>
  );
}
