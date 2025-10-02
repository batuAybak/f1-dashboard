import CalendarList from "./CalendarList.jsx";
import useQuery from "../../api/useQuery.js";

export default function DriversPage() {
  const { data: calendar, loading, error } = useQuery("/calendar", "circuit");

  if (loading || !calendar) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <>
      <h2 className="calendar-header">Calendar</h2>
      <ul className="calendar-list">
        {calendar.map((circuit) => (
          <CalendarList key={circuit.meeting_key} circuit={circuit} />
        ))}
      </ul>
    </>
  );
}
