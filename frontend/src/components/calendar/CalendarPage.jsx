import CalendarList from "./CalendarList.jsx";
import useQuery from "../../api/useQuery.js";

export default function DriversPage() {
  const { data: calendar, loading, error } = useQuery("/calendar", "circuit");

  if (loading || !calendar) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <>
      <h1 className="calendar-header">Calendar</h1>
      <ul className="calendar-list">
        {calendar.map((circuit) => (
          <CalendarList key={calendar.meeting_key} circuit={circuit} />
        ))}
      </ul>
    </>
  );
}
