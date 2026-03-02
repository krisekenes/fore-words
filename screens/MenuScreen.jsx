import { styles, globalStyles } from "../styles.js";
import { getDailyDisplayDate, DAILY_PAR } from "../data/daily.js";

function formatVsPar(n) {
  if (n === 0) return "E";
  return n > 0 ? `+${n}` : `${n}`;
}

export default function MenuScreen({ onSelectCourse, onProfile, onScoring, savedGame, onResume, onDaily, todaysDailyResult }) {
  const dateLabel = getDailyDisplayDate();
  const dailyPlayed = !!todaysDailyResult;
  const dailyDiff = dailyPlayed ? todaysDailyResult.vsPar : null;
  const dailyDiffStr = dailyPlayed ? formatVsPar(dailyDiff) : null;

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={styles.menuContent}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "8px" }}>
            <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="2" width="2.5" height="22" rx="1" fill="#8BA89A"/>
              <polygon points="16.5,2 16.5,13 5,7.5" fill="#4a7c59"/>
              <text x="6.5" y="12" fontFamily="serif" fontWeight="700" fontSize="9" fill="#c9a94e">W</text>
              <circle cx="15" cy="27" r="2.5" fill="none" stroke="#4a7c59" strokeWidth="1.2"/>
              <circle cx="15" cy="27" r="1" fill="#8BA89A"/>
            </svg>
            <span style={{ fontSize: "14px", letterSpacing: "6px", color: "#8BA89A", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              EST. 2025
            </span>
          </div>
          <h1 style={{ fontSize: "52px", fontFamily: "'Playfair Display', serif", color: "#E8E0D0", margin: "0 0 4px 0", fontWeight: 700, lineHeight: 1.1 }}>
            FORE
          </h1>
          <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", color: "#c9a94e", fontStyle: "italic", fontWeight: 400 }}>
            Words Golf Club
          </div>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #c9a94e, transparent)", margin: "20px auto" }} />
          <p style={{ color: "#8BA89A", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: "320px", margin: "0 auto" }}>
            Guess the word in as few tries as possible. Each hole changes the word length and difficulty. Play under par to climb the leaderboard.
          </p>
        </div>

        {/* Daily Challenge card */}
        <div
          onClick={onDaily}
          style={{
            background: dailyPlayed
              ? "rgba(201,169,78,0.06)"
              : "linear-gradient(135deg, rgba(201,169,78,0.12) 0%, rgba(201,169,78,0.06) 100%)",
            border: `1px solid ${dailyPlayed ? "rgba(201,169,78,0.2)" : "rgba(201,169,78,0.4)"}`,
            borderRadius: "12px",
            padding: "16px 18px",
            marginBottom: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "3px", color: "#c9a94e", fontWeight: 600, marginBottom: "3px" }}>
              DAILY CHALLENGE · {dateLabel}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", color: "#E8E0D0", fontWeight: 600, marginBottom: "2px" }}>
              {dailyPlayed ? "Round Complete" : "3 Holes · Par 14"}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6a7a6e" }}>
              {dailyPlayed
                ? `${todaysDailyResult.totalScore} strokes · Par ${DAILY_PAR}`
                : "Easy → Medium → Hard"}
            </div>
          </div>
          {dailyPlayed ? (
            <div style={{ textAlign: "right", minWidth: "44px" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: dailyDiff <= 0 ? "#4CAF50" : "#D4956A",
              }}>
                {dailyDiffStr}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "1.5px", color: "#6a7a6e", marginTop: "1px" }}>
                PLAY AGAIN
              </div>
            </div>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); onDaily(); }}
              style={{
                ...styles.primaryBtn,
                padding: "10px 18px",
                fontSize: "12px",
                background: "linear-gradient(135deg, #c9a94e, #a8893e)",
                color: "#141914",
                flexShrink: 0,
              }}
            >
              PLAY
            </button>
          )}
        </div>

        {/* In-progress round banner */}
        {savedGame && (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8BA89A", fontWeight: 600, marginBottom: "2px" }}>
                Round in progress
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6a7a6e" }}>
                {savedGame.selectedCourse} · Hole {savedGame.currentHole + 1} of {savedGame.holes.length}
              </div>
            </div>
            <button
              onClick={onResume}
              style={{ ...styles.primaryBtn, padding: "8px 16px", fontSize: "12px" }}
            >
              RESUME
            </button>
          </div>
        )}

        <button onClick={onSelectCourse} style={styles.primaryBtn}>
          SELECT COURSE
        </button>
        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <button
            onClick={onScoring}
            style={{ ...styles.primaryBtn, flex: 1, background: "rgba(255,255,255,0.08)" }}
          >
            SCORING
          </button>
          <button
            onClick={onProfile}
            style={{ ...styles.primaryBtn, flex: 1, background: "rgba(255,255,255,0.08)" }}
          >
            MY PROFILE
          </button>
        </div>
      </div>
    </div>
  );
}
