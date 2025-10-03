import CalendarList from "./CalendarList.jsx";
import useQuery from "../../api/useQuery.js";

/**
 * DriversPage fetches and displays the full race calendar as a list of circuits.
 * Uses CalendarList to render each race in the calendar.
 */
export default function DriversPage() {
  // Fetch the full calendar of races/circuits
  const { data: calendar, loading, error } = useQuery("/calendar", "circuit");

  if (loading || !calendar) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <>
      <h2 className="calendar-header">Calendar</h2>
      <ul className="calendar-list">
        {/* Render a CalendarList card for each circuit */}
        {calendar.map((circuit) => (
          <CalendarList key={circuit.meeting_key} circuit={circuit} />
        ))}
      </ul>
    </>
  );
}
