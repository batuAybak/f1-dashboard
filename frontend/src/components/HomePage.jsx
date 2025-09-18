import useQuery from "../api/useQuery";

export default function HomePage() {
  const {
    data: calendar,
    loadingCalendar,
    errorCalendar,
  } = useQuery("/calendar", "calendar");
  if (loadingCalendar) return <p>Loading...</p>;
  if (errorCalendar)
    return <p>Error loading calendar: {errorCalendar.message}</p>;
  if (!calendar) return <p>No calendar data found.</p>;

  //Find the closest upcoming race from the calendar data
  const closestRace = calendar.find(
    (race) => new Date(race.date_start) > new Date()
  );
  console.log(closestRace);
  //TODO WORKING ON HOME PAGE COUNTDOWN PAGE
  return (
    <>
      <h1>Welcome to the F1 Dashboard</h1>
      <p>Here you can find information about drivers, teams, and races.</p>
      <p>Add your favorite teams or drivers to get personalized updates.</p>
      <p>Next Race:</p>
      {closestRace && (
        <p>
          {closestRace.meeting_official_name}
          <br />
          {new Date(closestRace.date_start).toLocaleDateString()}
        </p>
      )}
    </>
  );
}
