import { HANDICAP_BONUS } from "../gameLogic.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";

export default function MenuScreen({ handicap, setHandicap, onSelectCourse, onProfile, onScoring }) {
  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={styles.menuContent}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "14px", letterSpacing: "6px", color: "#8BA89A", fontFamily: "'DM Sans', sans-serif", marginBottom: "8px", fontWeight: 500 }}>
            ⛳ EST. 2025
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

        <div style={{ marginBottom: "32px" }}>
          <label style={{ display: "block", color: "#8BA89A", fontSize: "11px", letterSpacing: "3px", fontFamily: "'DM Sans', sans-serif", marginBottom: "12px", textAlign: "center", fontWeight: 500 }}>
            YOUR HANDICAP
          </label>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <button onClick={() => setHandicap(Math.max(0, handicap - 1))} style={styles.handicapBtn}>−</button>
            <div style={{ fontSize: "36px", fontFamily: "'Playfair Display', serif", color: "#E8E0D0", width: "60px", textAlign: "center", fontWeight: 700 }}>
              {handicap}
            </div>
            <button onClick={() => setHandicap(Math.min(30, handicap + 1))} style={styles.handicapBtn}>+</button>
          </div>
          <div style={{ textAlign: "center", color: "#6a7a6e", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", marginTop: "8px" }}>
            +{HANDICAP_BONUS(handicap)} bonus {HANDICAP_BONUS(handicap) === 1 ? "guess" : "guesses"} per hole
          </div>
        </div>

        <button
          onClick={onSelectCourse}
          style={styles.primaryBtn}
        >
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
