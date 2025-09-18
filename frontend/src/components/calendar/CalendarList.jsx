import { useNavigate } from "react-router";

//TODO hardcode images for each grand prix background
export default function CalendarList({ circuit }) {
  const navigate = useNavigate();

  return (
    <li
      className="calendar-card"
      onClick={() => navigate(`/calendar/${circuit.circuit_short_name}`)}
    >
      <h2 className="calendar-grandPrix">{circuit?.meeting_official_name}</h2>
    </li>
  );
}
