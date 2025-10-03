import { useNavigate } from "react-router";

/**
 * CalendarList renders a clickable card for a single race/circuit in the calendar.
 * Navigates to the detailed view of the selected Grand Prix when clicked.
 */
export default function CalendarList({ circuit }) {
  const navigate = useNavigate();

  return (
    <li
      key={circuit.meeting_key}
      className="calendar-card"
      // Navigate to the Grand Prix details page on click
      onClick={() => navigate(`/calendar/${circuit.meeting_key}`)}
      style={{
        backgroundImage: `url(${circuit.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Display the official name of the Grand Prix */}
      <h2 className="calendar-grandPrix">{circuit?.meeting_official_name}</h2>
    </li>
  );
}
