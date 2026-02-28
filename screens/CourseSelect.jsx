import { COURSES, getCoursePar, getCourseLengths } from "../data/courses.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";
import { useState } from "react";

const MODES = {
  quick: { label: "QUICK PLAY", holes: 3 },
  full: { label: "FULL ROUND", holes: 9 },
};

export default function CourseSelect({ onBack, onStartCourse }) {
  const [mode, setMode] = useState("full");
  const holeCount = MODES[mode].holes;

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={styles.menuContent}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#E8E0D0", fontSize: "32px", textAlign: "center", margin: "0 0 8px 0" }}>
          Select Course
        </h2>
        <div style={{ width: "40px", height: "2px", background: "#c9a94e", margin: "0 auto 24px" }} />

        {/* Mode Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "24px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "4px" }}>
          {Object.entries(MODES).map(([key, m]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "6px",
                border: "none",
                background: mode === key ? "linear-gradient(135deg, #4a7c59, #3a6a49)" : "transparent",
                color: mode === key ? "#E8E0D0" : "#6a7a6e",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "2px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {m.label}
              <div style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "1px", marginTop: "2px", opacity: 0.7 }}>
                {m.holes} holes
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {Object.entries(COURSES).map(([name, c]) => {
            const par = getCoursePar(name, holeCount);
            const lengths = getCourseLengths(name);
            return (
              <button
                key={name}
                onClick={() => onStartCourse(name, holeCount)}
                style={{
                  background: `linear-gradient(135deg, ${c.color}cc, ${c.color}88)`,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(201,169,78,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#E8E0D0", marginBottom: "4px", fontWeight: 600 }}>
                  {name}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8BA89A", marginBottom: "12px" }}>
                  {c.description}
                </div>
                <div style={{ display: "flex", gap: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6a8a6e" }}>
                  <span>~Par {par}</span>
                  <span>{holeCount} Holes</span>
                  <span>{lengths.join("-")} letters</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
