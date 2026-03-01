import { COURSES, QUICK_COURSES, MASTERS_COURSE, getCoursePar, getCourseLengths } from "../data/courses.js";
import { THEMES } from "../data/themes.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";
import { useState } from "react";

const MODES = [
  { key: "quick", label: "QUICK", holes: 3 },
  { key: "full", label: "FULL", holes: 9 },
  { key: "themed", label: "THEMED", holes: 9 },
  { key: "masters", label: "MASTERS", holes: 18 },
  { key: "experimental", label: "LABS", holes: 9 },
];

export default function CourseSelect({ onBack, onStartCourse }) {
  const [mode, setMode] = useState("full");
  const [theme, setTheme] = useState("sports");
  const modeInfo = MODES.find(m => m.key === mode);
  const holeCount = modeInfo.holes;
  const activeTheme = mode === "themed" ? theme : "classic";
  const gameMode = mode === "experimental" ? "experimental" : "standard";
  const activeCourses = mode === "masters" ? MASTERS_COURSE : mode === "quick" ? QUICK_COURSES : COURSES;

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
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: mode === "themed" ? "16px" : "24px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "4px" }}>
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "6px",
                border: "none",
                background: mode === m.key ? "linear-gradient(135deg, #4a7c59, #3a6a49)" : "transparent",
                color: mode === m.key ? "#E8E0D0" : "#6a7a6e",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1.5px",
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

        {/* Theme Selector — only shown in themed mode */}
        {mode === "themed" && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "6px",
            }}>
              {THEMES.map((t) => {
                const isSelected = theme === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    style={{
                      padding: "8px 4px",
                      borderRadius: "6px",
                      border: isSelected ? "1px solid rgba(74,124,89,0.6)" : "1px solid rgba(255,255,255,0.08)",
                      background: isSelected ? "linear-gradient(135deg, #4a7c59, #3a6a49)" : "rgba(255,255,255,0.04)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? "#E8E0D0" : "#8BA89A",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {Object.entries(activeCourses).map(([name, c]) => {
            const par = getCoursePar(name, holeCount);
            const lengths = getCourseLengths(name);
            return (
              <button
                key={name}
                onClick={() => onStartCourse(name, holeCount, activeTheme, gameMode)}
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
