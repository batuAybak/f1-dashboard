import { useNavigate } from "react-router";

export default function CalendarList({ circuit }) {
  const navigate = useNavigate();

  console.log(circuit.image);

  return (
    <li
      className="calendar-card"
      onClick={() => navigate(`/calendar/${circuit.circuit_short_name}`)}
      style={{
        backgroundImage: `url(${circuit.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="calendar-grandPrix">{circuit?.meeting_official_name}</h2>
    </li>
  );
}
