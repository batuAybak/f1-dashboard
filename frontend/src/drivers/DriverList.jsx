import useQuery from "../api/useQuery.js";

export default function DriverList({ driver, teamName }) {
  const { data: teams, loading, error } = useQuery("/teams", "teams");

  if (loading || !teams) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  const team = teams.find((team) => team.team_name == teamName);

  return (
    <li
      className="driver-card"
      style={{ backgroundColor: `#${team.team_color}` }}
    >
      <div className="driver-picture-number">
        <img
          src={driver?.headshot_url}
          alt={driver?.first_name}
          className="driver-headshot"
        />
        <h3 className="driver-number">{driver?.driver_number}</h3>
      </div>
      <div className="driver-info">
        <h2 className="driver-name">
          {driver?.first_name} {driver?.last_name}
        </h2>
        <p className="driver-team">{driver?.team_name}</p>
        <p className="driver-country">{driver?.country_code}</p>
      </div>
    </li>
  );
}
