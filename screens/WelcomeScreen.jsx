import { useState } from "react";
import { HANDICAP_BONUS } from "../gameLogic.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";

export default function WelcomeScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [handicap, setHandicap] = useState(10);

  const steps = [
    // Step 0: Welcome
    <div key="welcome" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "14px", letterSpacing: "6px", color: "#8BA89A", fontFamily: "'DM Sans', sans-serif", marginBottom: "8px", fontWeight: 500 }}>
        WELCOME TO
      </div>
      <h1 style={{ fontSize: "52px", fontFamily: "'Playfair Display', serif", color: "#E8E0D0", margin: "0 0 4px 0", fontWeight: 700, lineHeight: 1.1 }}>
        FORE
      </h1>
      <div style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", color: "#c9a94e", fontStyle: "italic", fontWeight: 400 }}>
        Words Golf Club
      </div>
      <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #c9a94e, transparent)", margin: "24px auto" }} />
      <p style={{ color: "#8BA89A", fontSize: "15px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, maxWidth: "320px", margin: "0 auto 32px" }}>
        A word-guessing game with a golf twist. Solve 9 word puzzles per round — each one is a "hole" with its own par.
      </p>
      <button onClick={() => setStep(1)} style={styles.primaryBtn}>
        HOW IT WORKS
      </button>
    </div>,

    // Step 1: How it works
    <div key="howto" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#6a7a6e", fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
        HOW IT WORKS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "320px", margin: "0 auto 32px" }}>
        {[
          { icon: "🟩", title: "Guess the Word", desc: "Green means right letter, right spot. Gold means right letter, wrong spot." },
          { icon: "⛳", title: "Play 9 Holes", desc: "Each hole is a different word. Lengths range from 4 to 7 letters." },
          { icon: "📊", title: "Score Like Golf", desc: "Fewer guesses = better score. Birdie (-1), Par (0), Bogey (+1), and more." },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ display: "flex", gap: "14px", textAlign: "left" }}>
            <div style={{ fontSize: "24px", flexShrink: 0, width: "36px", textAlign: "center" }}>{icon}</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#E8E0D0", fontWeight: 600, marginBottom: "4px" }}>
                {title}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8BA89A", lineHeight: 1.5 }}>
                {desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setStep(2)} style={styles.primaryBtn}>
        SET YOUR HANDICAP
      </button>
    </div>,

    // Step 2: Handicap picker
    <div key="handicap" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#6a7a6e", fontFamily: "'DM Sans', sans-serif", marginBottom: "16px" }}>
        SET YOUR HANDICAP
      </div>
      <p style={{ color: "#8BA89A", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: "300px", margin: "0 auto 24px" }}>
        Your handicap gives you extra guesses per hole. New to word games? Start higher. Wordle veteran? Go low.
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "8px" }}>
        <button onClick={() => setHandicap(Math.max(0, handicap - 1))} style={styles.handicapBtn}>−</button>
        <div style={{ fontSize: "48px", fontFamily: "'Playfair Display', serif", color: "#E8E0D0", width: "70px", textAlign: "center", fontWeight: 700 }}>
          {handicap}
        </div>
        <button onClick={() => setHandicap(Math.min(30, handicap + 1))} style={styles.handicapBtn}>+</button>
      </div>
      <div style={{ color: "#6a7a6e", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>
        +{HANDICAP_BONUS(handicap)} bonus {HANDICAP_BONUS(handicap) === 1 ? "guess" : "guesses"} per hole
      </div>
      <div style={{ color: "#4a5a4e", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", marginBottom: "32px" }}>
        You can change this anytime from the menu
      </div>
      <button onClick={() => onComplete(handicap)} style={styles.primaryBtn}>
        LET'S PLAY
      </button>
    </div>,
  ];

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={styles.menuContent}>
        {steps[step]}
        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i === step ? "#c9a94e" : "rgba(255,255,255,0.15)",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
