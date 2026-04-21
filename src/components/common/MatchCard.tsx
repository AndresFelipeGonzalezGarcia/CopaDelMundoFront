import { Calendar, MapPin } from "lucide-react";

interface MatchProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  stadium: string;
  flagHome: string;
  flagAway: string;
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  date,
  stadium,
  flagHome,
  flagAway,
}: MatchProps) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderLeft: "5px solid #D4AF37",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <span style={{ fontSize: "2rem" }}>{flagHome}</span>
          <p style={{ fontWeight: "bold", margin: "5px 0" }}>{homeTeam}</p>
        </div>
        <div style={{ fontWeight: "bold", color: "#0A1A3A" }}>VS</div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <span style={{ fontSize: "2rem" }}>{flagAway}</span>
          <p style={{ fontWeight: "bold", margin: "5px 0" }}>{awayTeam}</p>
        </div>
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: "#666",
          borderTop: "1px solid #eee",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Calendar size={14} /> {date}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "5px",
          }}
        >
          <MapPin size={14} /> {stadium}
        </div>
      </div>
    </div>
  );
};
