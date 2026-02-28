import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";

const SCORE_TABLE = [
  { name: "Ace", diff: null, desc: "Solved in 1 guess", color: "#FFD700" },
  { name: "Albatross", diff: "-3", desc: "3 under par", color: "#E8B4F8" },
  { name: "Eagle", diff: "-2", desc: "2 under par", color: "#FFD700" },
  { name: "Birdie", diff: "-1", desc: "1 under par", color: "#4CAF50" },
  { name: "Par", diff: "E", desc: "Even with par", color: "#8BA89A" },
  { name: "Bogey", diff: "+1", desc: "1 over par", color: "#D4956A" },
  { name: "Double Bogey", diff: "+2", desc: "2 over par", color: "#C0392B" },
];

const PAR_TABLE = [
  { letters: 4, par: 4, max: 6, reason: "Few letters, less info per guess" },
  { letters: 5, par: 4, max: 6, reason: "The classic Wordle length" },
  { letters: 6, par: 5, max: 7, reason: "More letters, more to work with" },
  { letters: 7, par: 6, max: 8, reason: "Long words, plenty of clues" },
];

export default function ScoringScreen({ onBack }) {
  const sectionTitle = {
    fontFamily: "'Playfair Display', serif",
    color: "#E8E0D0",
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "12px",
  };
  const bodyText = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "#8BA89A",
    lineHeight: 1.6,
  };

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={{ ...styles.menuContent, justifyContent: "flex-start", paddingTop: "24px", overflowY: "auto" }}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#E8E0D0", fontSize: "28px", textAlign: "center", margin: "0 0 4px 0" }}>
          How Scoring Works
        </h2>
        <div style={{ width: "40px", height: "2px", background: "#c9a94e", margin: "0 auto 28px" }} />

        {/* Par by word length */}
        <div style={{ marginBottom: "28px" }}>
          <div style={sectionTitle}>Par by Word Length</div>
          <p style={{ ...bodyText, marginTop: 0, marginBottom: "12px" }}>
            Shorter words give you less information per guess, so 4 and 5 letter holes share the same par. Longer words give more clues per tile, so par scales up from there.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th style={{ ...styles.th, textAlign: "left" }}>Letters</th>
                <th style={styles.th}>Par</th>
                <th style={styles.th}>Max*</th>
                <th style={{ ...styles.th, textAlign: "left" }}>Why</th>
              </tr>
            </thead>
            <tbody>
              {PAR_TABLE.map((row) => (
                <tr key={row.letters} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ ...styles.td, textAlign: "left", color: "#E8E0D0", fontWeight: 600 }}>{row.letters}</td>
                  <td style={{ ...styles.td, color: "#c9a94e", fontWeight: 700 }}>{row.par}</td>
                  <td style={{ ...styles.td, color: "#6a7a6e" }}>{row.max}</td>
                  <td style={{ ...styles.td, textAlign: "left", color: "#8BA89A", fontSize: "11px" }}>{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ ...bodyText, fontSize: "11px", color: "#6a7a6e", marginTop: "8px" }}>
            *Max guesses = par + 2 + handicap bonus. Shown at 0 handicap.
          </div>
        </div>

        {/* Score names */}
        <div style={{ marginBottom: "28px" }}>
          <div style={sectionTitle}>Score Names</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {SCORE_TABLE.map((s) => (
              <div key={s.name} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 12px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.03)",
              }}>
                <div style={{
                  width: "36px",
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: s.color,
                }}>
                  {s.diff || "1"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: s.color }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#6a7a6e" }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handicap */}
        <div style={{ marginBottom: "28px" }}>
          <div style={sectionTitle}>Handicap System</div>
          <p style={{ ...bodyText, marginTop: 0, marginBottom: "12px" }}>
            Your handicap gives you extra guesses on every hole. Higher handicap means more room to work with.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { range: "0 – 4", bonus: "+0 guesses" },
              { range: "5 – 11", bonus: "+1 guess" },
              { range: "12 – 19", bonus: "+2 guesses" },
              { range: "20 – 30", bonus: "+3 guesses" },
            ].map((h) => (
              <div key={h.range} style={{
                padding: "8px 12px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#E8E0D0", fontWeight: 600 }}>
                  {h.range}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#6a7a6e" }}>
                  {h.bonus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Failed hole */}
        <div style={{ marginBottom: "16px" }}>
          <div style={sectionTitle}>Failed Holes</div>
          <p style={{ ...bodyText, marginTop: 0 }}>
            If you run out of guesses, you score max guesses + 1 as a penalty stroke. The answer is revealed so you can learn for next time.
          </p>
        </div>
      </div>
    </div>
  );
}
