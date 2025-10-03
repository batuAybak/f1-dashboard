import useQuery from "../../api/useQuery";

/**
 * TeamList renders a card for a single team, showing its drivers and vehicle.
 */
export default function TeamList({ team }) {
  // Fetch all drivers to filter by team
  const {
    data: drivers,
    loading: loadingDrivers,
    error: errorDrivers,
  } = useQuery("/drivers", "drivers");
  if (loadingDrivers) return <p>Loading...</p>;
  if (errorDrivers) return <p>Error: {errorDrivers}</p>;
  if (!drivers) return <p>No drivers found.</p>;

  return (
    <li
      className="team-card"
      style={{ backgroundColor: `#${team.team_color}` }}
    >
      {/* Team name and logo */}
      <h2 className="team-name-header">{team.team_name}</h2>
      <img
        className="team-card-logo-image"
        src={team.team_logos}
        alt={`${team.team_name} logo`}
        style={{ backgroundColor: `#${team.team_color}` }}
      />
      {/* List of drivers for this team */}
      <ul className="drivers-list">
        {drivers
          .filter((driver) => driver.team_name == team.team_name)
          .map((driver) => (
            <li key={driver.driver_number} className="team-driver-name">
              {driver.first_name + " " + driver.last_name}
            </li>
          ))}
      </ul>
      {/* Team vehicle image */}
      <img
        className="team-card-vehicle-image"
        src={team.vehicle_image}
        alt={`${team.team_name} vehicle`}
      />
    </li>
  );
}
