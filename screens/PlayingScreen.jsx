import { useState } from "react";
import { KEYBOARD_ROWS, TILE_COLORS } from "../constants.js";
import { getScoreName } from "../gameLogic.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";

const heatmapColor = (value) => {
  if (value <= 0) return "rgba(255,255,255,0.08)";
  if (value <= 0.3) {
    const t = value / 0.3;
    const r = Math.round(255 + (40 - 255) * t);
    const g = Math.round(255 + (160 - 255) * t);
    const b = Math.round(255 + (80 - 255) * t);
    const a = 0.1 + (0.35 - 0.1) * t;
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }
  if (value <= 0.6) {
    const t = (value - 0.3) / 0.3;
    const a = 0.35 + (0.65 - 0.35) * t;
    return `rgba(40,160,80,${a.toFixed(2)})`;
  }
  const t = (value - 0.6) / 0.4;
  const r = Math.round(40 + (220 - 40) * t);
  const g = Math.round(160 + (180 - 160) * t);
  const b = Math.round(80 + (50 - 80) * t);
  const a = 0.65 + (0.9 - 0.65) * t;
  return `rgba(${r},${g},${b},${a.toFixed(2)})`;
};

export default function PlayingScreen({
  guesses,
  currentGuess,
  answer,
  gameState,
  hole,
  holes,
  scores,
  currentHole,
  selectedCourse,
  displayCourseName,
  maxGuesses,
  shakeRow,
  revealRow,
  letterStates,
  holeMessage,
  revealedTiles,
  toastMessage,
  heatmap,
  onKey,
  onAdvanceHole,
  onQuit,
}) {
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const currentHoleScore = gameState === "won" ? guesses.length
    : gameState === "lost" ? maxGuesses + 1
    : undefined;
  const miniScoreTotal = scores.reduce((s, v) => s + v, 0) + (currentHoleScore || 0);
  const miniParTotal = holes.slice(0, currentHole).reduce((s, h) => s + h.par, 0) + (currentHoleScore !== undefined ? hole.par : 0);
  const thruCount = currentHole + (currentHoleScore !== undefined ? 1 : 0);
  const miniDiff = miniScoreTotal - miniParTotal;
  const miniDiffStr = thruCount === 0 ? "E" : miniDiff === 0 ? "E" : miniDiff > 0 ? `+${miniDiff}` : `${miniDiff}`;

  const renderTile = (letter, state, index, isRevealing, rowIdx) => {
    const delay = isRevealing ? index * 0.3 : 0;
    const tileKey = `${rowIdx}-${index}`;
    const isRevealed = revealedTiles.has(tileKey);

    const showColor = state && (!isRevealing || isRevealed);
    const bgColor = showColor ? TILE_COLORS[state] : letter ? TILE_COLORS.tbd : TILE_COLORS.empty;
    const borderColor = showColor ? TILE_COLORS[state] : letter ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)";
    const tileSize = Math.min(56, (320 - (hole?.wordLength || 5) * 4) / (hole?.wordLength || 5));

    return (
      <div
        key={index}
        style={{
          perspective: "400px",
          width: tileSize,
          height: tileSize,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: hole?.wordLength >= 7 ? "18px" : "22px",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            color: "#fff",
            border: `2px solid ${borderColor}`,
            borderRadius: "4px",
            backgroundColor: bgColor,
            animation: isRevealing ? `flipReveal 0.5s ease-in-out ${delay}s both` : letter && !state ? "popIn 0.1s ease" : "none",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transformStyle: "preserve-3d",
            willChange: isRevealing ? "transform" : "auto",
            transition: "background-color 0s, border-color 0s",
          }}
        >
          {letter}
        </div>
      </div>
    );
  };

  const renderKeyboard = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", padding: "0 4px" }}>
      {KEYBOARD_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: "4px" }}>
          {row.map(key => {
            const state = letterStates[key];
            const isAbsent = state === "absent";
            const isCorrect = state === "correct";
            const isPresent = state === "present";
            const heatVal = heatmap && !state ? heatmap[key] : null;
            const bg = isCorrect ? TILE_COLORS.correct
              : isPresent ? TILE_COLORS.present
              : isAbsent ? "rgba(255,255,255,0.03)"
              : heatVal != null ? heatmapColor(heatVal)
              : "rgba(255,255,255,0.15)";
            const textColor = isAbsent ? "rgba(255,255,255,0.18)" : "#fff";
            const isWide = key === "ENTER" || key === "⌫";

            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                style={{
                  width: isWide ? "62px" : "34px",
                  height: "48px",
                  borderRadius: "6px",
                  border: isAbsent ? "1px solid rgba(255,255,255,0.04)" : "none",
                  backgroundColor: bg,
                  color: textColor,
                  fontSize: key === "⌫" ? "20px" : isWide ? "11px" : "14px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: isAbsent ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  letterSpacing: isWide ? "1px" : "0",
                  opacity: isAbsent ? 0.5 : 1,
                  textDecoration: isAbsent ? "line-through" : "none",
                  textDecorationColor: "rgba(255,255,255,0.15)",
                }}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < maxGuesses; i++) {
      const guess = guesses[i];
      const isCurrentRow = i === guesses.length && gameState === "playing";
      const isRevealing = i === revealRow;
      const tiles = [];

      for (let j = 0; j < hole.wordLength; j++) {
        if (guess) {
          tiles.push(renderTile(guess.word[j], guess.evaluation[j], j, isRevealing, i));
        } else if (isCurrentRow) {
          tiles.push(renderTile(currentGuess[j] || "", null, j, false, i));
        } else {
          tiles.push(renderTile("", null, j, false, i));
        }
      }

      rows.push(
        <div
          key={i}
          style={{
            display: "flex",
            gap: "4px",
            animation: isCurrentRow && shakeRow ? "shake 0.5s ease" : "none",
          }}
        >
          {tiles}
        </div>
      );
    }
    return rows;
  };

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>

      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setShowQuitConfirm(true)}
            style={{ background: "none", border: "none", color: "#6a7a6e", fontSize: "18px", cursor: "pointer", padding: "4px", lineHeight: 1 }}
          >
            ✕
          </button>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px", color: "#6a7a6e" }}>
              {(displayCourseName || selectedCourse)?.toUpperCase()}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#E8E0D0" }}>
              Hole {hole.num} <span style={{ color: "#8BA89A", fontSize: "14px", fontWeight: 400 }}>· {hole.name}</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "24px", fontWeight: 700, color: miniDiff <= 0 ? "#4CAF50" : "#D4956A" }}>
            {miniDiffStr}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#6a7a6e", letterSpacing: "1px" }}>
            THRU {thruCount}
          </div>
        </div>
      </div>

      {/* Hole Info Bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2px", color: "#6a7a6e" }}>PAR</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#E8E0D0", fontWeight: 700 }}>{hole.par}</div>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2px", color: "#6a7a6e" }}>LETTERS</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#E8E0D0", fontWeight: 700 }}>{hole.wordLength}</div>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2px", color: "#6a7a6e" }}>GUESSES</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#E8E0D0", fontWeight: 700 }}>{maxGuesses}</div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", padding: "12px 16px", minHeight: 0, overflow: "auto" }}>
        {renderGrid()}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#E8E0D0",
          color: "#141914",
          padding: "10px 24px",
          borderRadius: "8px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          zIndex: 200,
          animation: "toastIn 0.25s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          letterSpacing: "0.5px",
        }}>
          {toastMessage}
        </div>
      )}

      {/* Score Message Overlay */}
      {holeMessage && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(20,25,20,0.95)",
          border: `2px solid ${holeMessage.color}`,
          borderRadius: "16px",
          padding: "32px 48px",
          textAlign: "center",
          zIndex: 100,
          animation: "fadeInUp 0.4s ease",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: holeMessage.color, fontWeight: 700, marginBottom: "8px" }}>
            {holeMessage.name}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#8BA89A", marginBottom: "20px" }}>
            {gameState === "won" ? `${guesses.length} ${guesses.length === 1 ? "stroke" : "strokes"}` : `The word was ${answer}`}
          </div>
          <button onClick={onAdvanceHole} style={{ ...styles.primaryBtn, padding: "10px 32px", fontSize: "13px", whiteSpace: "nowrap" }}>
            {currentHole < holes.length - 1 ? "NEXT HOLE →" : "VIEW SCORECARD"}
          </button>
        </div>
      )}

      {/* Keyboard */}
      <div style={{ padding: "8px 0 12px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        {renderKeyboard()}
      </div>

      {/* Mini Scorecard */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2px", padding: "0 8px 16px" }}>
        {holes.map((h, i) => {
          const s = scores[i];
          const isCurrent = i === currentHole;
          const currentHoleScore = isCurrent && gameState === "won" ? guesses.length
            : isCurrent && gameState === "lost" ? maxGuesses + 1
            : undefined;
          const displayScore = s !== undefined ? s : currentHoleScore;
          const info = displayScore !== undefined ? getScoreName(displayScore, h.par) : null;
          return (
            <div key={i} style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              background: isCurrent ? "rgba(201,169,78,0.15)" : displayScore !== undefined ? "rgba(255,255,255,0.05)" : "transparent",
              border: isCurrent ? "1.5px solid #c9a94e" : "1px solid rgba(255,255,255,0.06)",
              color: info ? info.color : isCurrent ? "#c9a94e" : "#3a4a3e",
            }}>
              {displayScore !== undefined ? displayScore : i + 1}
            </div>
          );
        })}
      </div>

      {/* Quit Confirmation */}
      {showQuitConfirm && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 300,
          backdropFilter: "blur(4px)",
        }}>
          <div style={{
            background: "#1a1f1a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "28px 32px",
            textAlign: "center",
            maxWidth: "300px",
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#E8E0D0", marginBottom: "8px", fontWeight: 600 }}>
              Take a Break?
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8BA89A", marginBottom: "24px", lineHeight: 1.5 }}>
              Your round will be saved. You can resume from the menu.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowQuitConfirm(false)}
                style={{ ...styles.primaryBtn, flex: 1, background: "rgba(255,255,255,0.08)", fontSize: "13px", padding: "10px" }}
              >
                KEEP PLAYING
              </button>
              <button
                onClick={onQuit}
                style={{ ...styles.primaryBtn, flex: 1, fontSize: "13px", padding: "10px" }}
              >
                SAVE & QUIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
