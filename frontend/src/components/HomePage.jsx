import { useState, useEffect } from "react";
import useQuery from "../api/useQuery";

/**
 * HomePage displays a welcome message and a countdown to the next race.
 * Fetches the race calendar and finds the closest upcoming race.
 */
export default function HomePage() {
  // Fetch the race calendar
  const {
    data: calendar,
    loadingCalendar,
    errorCalendar,
  } = useQuery("/calendar", "calendar");

  // Find the closest upcoming race from the calendar data
  const closestRace = calendar?.find(
    (race) => new Date(race.date_start) > new Date()
  );

  // Countdown state for the next race
  const [countdown, setCountdown] = useState("");

  // Update the countdown every second
  useEffect(() => {
    if (!closestRace) return;
    const target = new Date(closestRace.date_start).getTime(); // Converts the race start date to milliseconds (timestamp format)

    /**
     * Updates the countdown timer to the next race.
     */
    const updateCountdown = () => {
      const now = Date.now(); // Current time in milliseconds
      const diff = target - now; // Time difference in milliseconds
      if (diff <= 0) {
        // If difference is 0 or negative, the race has begun
        setCountdown("Race started!");
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60)); // Divide by (1000ms × 60s × 60min) = milliseconds in an hour
      const minutes = Math.floor((diff / (1000 * 60)) % 60); // Divide by (1000ms × 60s), then use % 60 to get remainder after hours
      const seconds = Math.floor((diff / 1000) % 60); // Divide by 1000ms, then use % 60 to get remainder after minutes
      setCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`); // Sets the countdown state to display the formatted time string.
    };

    updateCountdown(); // Initial call to set the countdown immediately
    const interval = setInterval(updateCountdown, 1000); // Update every second
    return () => clearInterval(interval); // Prevents memory leaks when component unmounts or race changes
  }, [closestRace]); // Dependency array. Re-runs the effect whenever closestRace changes (different race selected).

  if (loadingCalendar) return <p>Loading...</p>;
  if (errorCalendar)
    return <p>Error loading calendar: {errorCalendar.message}</p>;
  if (!calendar) return <p>No calendar data found.</p>;
  if (!closestRace)
    return (
      <p>
        No upcoming races until {new Date().getFullYear() + 1} season calendar
        is available.
      </p>
    );

  return (
    <>
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to the F1 Dashboard</h1>
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
              <h4>{closestRace.meeting_official_name}</h4>
              <p>{new Date(closestRace.date_start).toLocaleDateString()}</p>
              <p>Till lights out and away we go: {countdown}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
