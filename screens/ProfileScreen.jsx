import { getStats } from "../storage.js";
import { styles } from "../styles.js";
import { globalStyles } from "../styles.js";

function formatVsPar(n) {
  if (n === 0) return "E";
  return n > 0 ? `+${n}` : `${n}`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProfileScreen({ profile, onBack }) {
  const stats = getStats(profile);
  const recentRounds = [...(profile.rounds || [])].reverse().slice(0, 10);

  return (
    <div style={styles.container}>
      <style>{globalStyles}</style>
      <div style={{ ...styles.menuContent, padding: "24px 20px" }}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>

        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#E8E0D0", fontSize: "28px", textAlign: "center", margin: "0 0 4px 0" }}>
          Player Profile
        </h2>
        <div style={{ textAlign: "center", color: "#8BA89A", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", marginBottom: "28px" }}>
          Handicap {profile.handicap}
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "28px" }}>
          <StatCard label="ROUNDS" value={stats.roundsPlayed} />
          <StatCard
            label="AVG vs PAR"
            value={stats.roundsPlayed > 0 ? formatVsPar(stats.avgVsPar) : "—"}
            color={stats.avgVsPar <= 0 ? "#4CAF50" : "#D4956A"}
          />
          <StatCard
            label="BEST"
            value={stats.bestVsPar !== null ? formatVsPar(stats.bestVsPar) : "—"}
            color={stats.bestVsPar !== null && stats.bestVsPar <= 0 ? "#4CAF50" : "#D4956A"}
          />
          <StatCard label="HOLES" value={stats.totalHolesPlayed} />
          <StatCard label="ACES" value={stats.totalAces} color="#FFD700" />
          <StatCard label="BIRDIES+" value={stats.birdieOrBetter} color="#4CAF50" />
        </div>

        {/* Recent Rounds */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "3px", color: "#6a7a6e", marginBottom: "12px", fontWeight: 500 }}>
            RECENT ROUNDS
          </div>

          {recentRounds.length === 0 ? (
            <div style={{ textAlign: "center", color: "#4a5a4e", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", padding: "32px 0" }}>
              No rounds played yet. Hit the course!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {recentRounds.map((round, i) => {
                const diffStr = formatVsPar(round.vsPar);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#E8E0D0", fontWeight: 500 }}>
                        {round.course}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#6a7a6e", marginTop: "2px" }}>
                        {formatDate(round.date)} · {round.totalScore} strokes · Par {round.totalPar}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: round.vsPar <= 0 ? "#4CAF50" : "#D4956A",
                    }}>
                      {diffStr}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "#E8E0D0" }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "14px 8px",
      background: "rgba(255,255,255,0.03)",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color, marginBottom: "4px" }}>
        {value}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "2px", color: "#6a7a6e", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}
