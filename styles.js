export const styles = {
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #141914 0%, #0f120f 50%, #141914 100%)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    fontFamily: "'DM Sans', sans-serif",
    overflow: "hidden",
  },
  menuContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px 24px",
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #4a7c59, #3a6a49)",
    border: "none",
    borderRadius: "8px",
    padding: "14px 24px",
    color: "#E8E0D0",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "3px",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
  },
  handicapBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#E8E0D0",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#8BA89A",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "24px",
    padding: "0",
  },
  th: {
    padding: "8px 4px",
    color: "#8BA89A",
    fontWeight: 600,
    fontSize: "11px",
    letterSpacing: "1px",
    textAlign: "center",
  },
  td: {
    padding: "8px 4px",
    textAlign: "center",
    color: "#E8E0D0",
  },
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; }
  body { margin: 0; background: #0f120f; }

  @keyframes flipReveal {
    0% { transform: rotateX(0deg); }
    50% { transform: rotateX(90deg); }
    100% { transform: rotateX(0deg); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    15% { transform: translateX(-6px); }
    30% { transform: translateX(6px); }
    45% { transform: translateX(-5px); }
    60% { transform: translateX(5px); }
    75% { transform: translateX(-3px); }
    90% { transform: translateX(3px); }
  }

  @keyframes popIn {
    0% { transform: scale(0.85); }
    40% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translate(-50%, -40%); }
    100% { opacity: 1; transform: translate(-50%, -50%); }
  }

  @keyframes toastIn {
    0% { opacity: 0; transform: translateX(-50%) translateY(-8px); }
    100% { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  button:hover { opacity: 0.9; }
  button:active { transform: scale(0.97); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
  .mode-scroll::-webkit-scrollbar { display: none; }
`;
