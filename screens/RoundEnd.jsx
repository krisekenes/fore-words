import { getScoreName } from "../gameLogic.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";

export default function RoundEnd({ holes, scores, selectedCourse, onPlayAgain, onClubhouse }) {
  const totalPar = holes.reduce((s, h) => s + h.par, 0);
  const total = scores.reduce((s, v) => s + v, 0);
  const diff = total - totalPar;
  const diffStr = diff === 0 ? "E" : diff > 0 ? `+${diff}` : `${diff}`;

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={{ ...styles.menuContent, padding: "24px 16px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#E8E0D0", fontSize: "28px", textAlign: "center", margin: "0 0 4px 0" }}>
          Round Complete
        </h2>
        <div style={{ textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: "48px", color: diff <= 0 ? "#4CAF50" : "#D4956A", marginBottom: "4px", fontWeight: 700 }}>
          {diffStr}
        </div>
        <div style={{ textAlign: "center", color: "#8BA89A", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", marginBottom: "24px" }}>
          {total} strokes · Par {totalPar} · {selectedCourse}
        </div>

        {/* Scorecard */}
        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th style={{ ...styles.th, textAlign: "left" }}>HOLE</th>
                {holes.map((h, i) => (
                  <th key={i} style={styles.th}>{h.num}</th>
                ))}
                <th style={{ ...styles.th, color: "#c9a94e" }}>TOT</th>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ ...styles.td, textAlign: "left", color: "#6a7a6e" }}>PAR</td>
                {holes.map((h, i) => (
                  <td key={i} style={{ ...styles.td, color: "#6a7a6e" }}>{h.par}</td>
                ))}
                <td style={{ ...styles.td, color: "#6a7a6e" }}>{totalPar}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...styles.td, textAlign: "left", color: "#E8E0D0", fontWeight: 600 }}>YOU</td>
                {scores.map((s, i) => {
                  const info = getScoreName(s, holes[i].par);
                  return (
                    <td key={i} style={{ ...styles.td }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        backgroundColor: s <= holes[i].par ? "rgba(74,124,89,0.3)" : s > holes[i].par + 1 ? "rgba(192,57,43,0.2)" : "transparent",
                        border: s === holes[i].par ? "1px solid rgba(139,168,154,0.3)" : "none",
                        color: info.color,
                        fontWeight: 700,
                        fontSize: "13px",
                      }}>
                        {s}
                      </span>
                    </td>
                  );
                })}
                <td style={{ ...styles.td, color: diff <= 0 ? "#4CAF50" : "#D4956A", fontWeight: 700, fontSize: "14px" }}>
                  {total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onClubhouse} style={{ ...styles.primaryBtn, flex: 1, background: "rgba(255,255,255,0.08)" }}>
            CLUBHOUSE
          </button>
          <button onClick={onPlayAgain} style={{ ...styles.primaryBtn, flex: 1 }}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}
