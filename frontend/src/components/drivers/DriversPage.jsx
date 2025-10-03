import DriverList from "./DriverList.jsx";
import useQuery from "../../api/useQuery.js";

/**
 * DriversPage fetches and displays a list of all drivers.
 * Uses DriverList to render each driver card.
 */
export default function DriversPage() {
  // Fetch all drivers
  const { data, loading, error } = useQuery("/drivers", "drivers");

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <>
      <h2 className="drivers-header">Drivers</h2>
      <ul className="driver-list">
        {/* Render a DriverList card for each driver */}
        {data.map((driver) => (
          <DriverList key={driver.driver_number} driver={driver} />
        ))}
      </ul>
    </>
  );
}
