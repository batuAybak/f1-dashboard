import { useParams } from "react-router";
import useQuery from "../../api/useQuery.js";

/**
 * DriverResults displays all race results for a specific driver.
 * Fetches driver, race, and calendar data and shows results in a table.
 */
export default function DriverResults() {
  const { driverNumber } = useParams();
  // Fetch race results for this driver
  const { data, loading, error } = useQuery(
    `/standings/${driverNumber}`,
    "races"
  );

  // Fetch all drivers for name lookup
  const {
    data: driver,
    loadingDriver,
    errorDriver,
  } = useQuery("/drivers", "drivers");

  // Fetch calendar for race location lookup
  const {
    data: calendar,
    loadingCalendar,
    errorCalendar,
  } = useQuery("/calendar", "circuit");
  if (loading || loadingDriver || loadingCalendar) return <p>Loading...</p>;
  if (error || errorDriver || errorCalendar) return <p>Error! {errorDriver}</p>;

  /**
   * Returns the full name and number of a driver.
   */
  const driverName = (driverNumber) => {
    const name = driver?.find(
      (driver) => driver?.driver_number == driverNumber
    );
    const fullName =
      name?.first_name +
      " " +
      name?.last_name +
      " " +
      "(#" +
      name?.driver_number +
      ")";
    return fullName;
  };

  /**
   * Returns the location name for a given meeting key.
   */
  const raceName = (meeting) => {
    const race = calendar?.find(
      (calendar) => calendar?.meeting_key === meeting
    );
    const location = race?.location;
    return location;
  };

  return (
    <div className="driver-results">
      <h2 className="results-header">
        {driverName(driverNumber)} Races Results
      </h2>
      <table>
        <thead>
          <tr>
            <th>Race</th>
            <th>Pos</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((driver) => (
            <tr key={driver.meeting_key}>
              <td>{raceName(driver.meeting_key)}</td>
              <td>{driver.position ?? "dnf"}</td>
              <td>{driver.points ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
