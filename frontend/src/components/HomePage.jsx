import { useState, useEffect } from "react";
import useQuery from "../api/useQuery";

export default function HomePage() {
  const {
    data: calendar,
    loadingCalendar,
    errorCalendar,
  } = useQuery("/calendar", "calendar");

  // Find the closest upcoming race from the calendar data
  const closestRace = calendar?.find(
    (race) => new Date(race.date_start) > new Date()
  );

  // Countdown state
  const [countdown, setCountdown] = useState("");

  // useEffect to update the countdown every second
  useEffect(() => {
    if (!closestRace) return;
    const target = new Date(closestRace.date_start).getTime(); // Get next race time in milliseconds

    const updateCountdown = () => {
      const now = Date.now(); // Current time in milliseconds
      const diff = target - now; // Difference in milliseconds
      if (diff <= 0) {
        // If the race has started
        setCountdown("Race started!");
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60)); // Convert milliseconds to hours
      const minutes = Math.floor((diff / (1000 * 60)) % 60); // Convert milliseconds to minutes
      const seconds = Math.floor((diff / 1000) % 60); // Convert milliseconds to seconds
      setCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`); // Update countdown string
    };

    updateCountdown(); // Initial call to set the countdown immediately
    const interval = setInterval(updateCountdown, 1000); // Update every second
    return () => clearInterval(interval);
  }, [closestRace]);

  if (loadingCalendar) return <p>Loading...</p>;
  if (errorCalendar)
    return <p>Error loading calendar: {errorCalendar.message}</p>;
  if (!calendar) return <p>No calendar data found.</p>;
  if (!closestRace) return <p>No upcoming race found.</p>;

  return (
    <>
      <div className="welcome-section">
        <h1>Welcome to the F1 Dashboard</h1>
        <p>
          Here you can find information about drivers, teams, and races.
          <br />
          Register to add your favorite teams or drivers to get personalized
          updates.
        </p>
      </div>

      <div className="next-race-section">
        <h2>🏁 Next Race 🏁</h2>
        {closestRace && (
          <div className="next-race-container">
            <img
              src={closestRace.image}
              alt="race link"
              className="next-race-image"
            />
            <div className="next-race-details">
              <h3>{closestRace.meeting_official_name}</h3>
              <p>{new Date(closestRace.date_start).toLocaleDateString()}</p>
              <p>Till lights out and away we go: {countdown}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
