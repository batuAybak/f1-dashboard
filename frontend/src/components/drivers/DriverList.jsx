import useQuery from "../../api/useQuery.js";
import { useNavigate } from "react-router";

/**
 * DriverList renders a card for a single driver, showing their info and team color.
 * Navigates to the driver's standings page on click.
 */
export default function DriverList({ driver }) {
  // Fetch all teams to get team color
  const { data: teams, loading, error } = useQuery("/teams", "teams");
  const navigate = useNavigate();

  if (loading || !teams) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  // Find the team for this driver
  const team = teams.find((team) => team.team_name == driver.team_name);

  return (
    <li
      key={driver.driver_number}
      className="driver-card"
      // Set background to team color
      style={{ background: `#${team.team_color}` }}
      // Navigate to driver standings on click
      onClick={() => navigate(`/standings/${driver.driver_number}`)}
    >
      <div className="driver-picture-number">
        {/* Driver headshot */}
        <img
          src={driver?.headshot_url}
          alt={driver?.first_name}
          className="driver-headshot"
        />
        {/* Driver number */}
        <h3 className="driver-number">{driver?.driver_number}</h3>
      </div>
      <div className="driver-info">
        {/* Driver name */}
        <h2 className="driver-name">
          {driver?.first_name} {driver?.last_name}
        </h2>
        {/* Team name */}
        <p className="driver-team">{driver?.team_name}</p>
        {/* Country code */}
        <p className="driver-country">{driver?.country_code}</p>
      </div>
    </li>
  );
}
