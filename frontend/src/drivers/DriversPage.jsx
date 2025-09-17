import DriverList from "./DriverList";
import useQuery from "../api/useQuery.js";

export default function driversPage() {
  const { data, loading, error } = useQuery("/drivers", "drivers");

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <ul className="driver-list">
      {data.map((driver) => (
        <DriverList
          key={driver.driver_number}
          driver={driver}
          teamName={driver.team_name}
        />
      ))}
    </ul>
  );
}
