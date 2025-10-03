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
    const target = new Date(closestRace.date_start).getTime();

    /**
     * Updates the countdown timer to the next race.
     */
    const updateCountdown = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setCountdown("Race started!");
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
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
