import { useParams } from "react-router";
import useQuery from "../../api/useQuery";

/**
 * GrandPrixDetails displays detailed information about a specific Grand Prix event,
 * including race details and results. Fetches data based on the meeting key from the URL.
 * Shows driver names, positions, and points for the race.
 */
export default function GrandPrixDetails() {
  const { meetingKey } = useParams();
  // Fetch race details and results for the selected meeting
  const { data, loading, error } = useQuery(
    `/calendar/${meetingKey}`,
    "grandPrix"
  );

  // Fetch all drivers for mapping driver numbers to names
  const {
    data: driver,
    loadingDriver,
    errorDriver,
  } = useQuery("/drivers", "drivers");

  if (loading || !data || loadingDriver) return <p>Loading...</p>;
  if (error || errorDriver) return <p>Error! {error}</p>;

  const race = data[0];
  const results = data[1];

  /**
   * Returns the full name of a driver given their number.
   */
  const driverName = (number) => {
    const name = driver?.find((driver) => driver?.driver_number === number);
    const fullName = name?.first_name + " " + name?.last_name;
    return fullName;
  };

  return (
    <>
      <section className="calendar-details-main">
        <div className="race-page">
          {/* Race image */}
          <img src={race.image} alt="Image link" className="race-images" />
          <div className="race-details">
            <h1 className="race-name">{race.meeting_name}</h1>
            <div className="race-country">
              <h2 className="race-country-name">{race.country_name}</h2>
              <h2 className="race-country-code">({race.country_code})</h2>
            </div>
            <p className="race-location">{race.location}</p>
            <p className="race-date">
              {new Date(race.date_start).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="results-header">Race Results</h2>
        <table>
          <thead>
            <tr>
              {results.length < 1 ? (
                <th>Race has not started</th>
              ) : (
                <>
                  <th>Pos</th>
                  <th>Driver #</th>
                  <th>Driver Name</th>
                  <th>Points</th>
                  <th>Gap</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                {/* Position in race */}
                <td>{index + 1}</td>
                {/* Driver number */}
                <td>{result.driver_number}</td>
                {/* Driver full name */}
                <td>{driverName(result.driver_number)}</td>
                {/* Points scored */}
                <td>{result.points}</td>
                {/* Gap to leader or DNF/DNS/DSQ status */}
                <td>
                  {result.dnf || result.dns || result.dsq
                    ? "dnf"
                    : result.gap_to_leader}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
