import { useParams } from "react-router";
import useQuery from "../../api/useQuery.js";

export default function DriverResults() {
  const { driverNumber } = useParams();
  const { data, loading, error } = useQuery(
    `/standings/${driverNumber}`,
    "races"
  );

  const {
    data: driver,
    loadingDriver,
    errorDriver,
  } = useQuery("/drivers", "drivers");

  const {
    data: calendar,
    loadingCalendar,
    errorCalendar,
  } = useQuery("/calendar", "circuit");
  if (loading || loadingDriver || loadingCalendar) return <p>Loading...</p>;
  if (error || errorDriver || errorCalendar) return <p>Error! {errorDriver}</p>;

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
