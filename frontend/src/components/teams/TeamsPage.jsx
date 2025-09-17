import useQuery from "../../api/useQuery";

export default function TeamsPage() {
  const { data: teams, loadingTeams, errorTeams } = useQuery("/teams", "teams");
  const {
    data: drivers,
    loadingDrivers,
    errorDrivers,
  } = useQuery("/drivers", "drivers");
  if (loadingTeams || loadingDrivers) return <p>Loading...</p>;
  if (errorTeams || errorDrivers)
    return <p>Error: {errorTeams || errorDrivers}</p>;
  if (!teams) return <p>No teams found.</p>;
  if (!drivers) return <p>No drivers found.</p>;

  return (
    <>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li
            key={team.id}
            className="team-card"
            style={{ backgroundColor: `#${team.team_color}` }} //TODO remove style later
          >
            <h2 className="team-name-header">{team.team_name}</h2>
            <div className="team-drivers">
              <ul>
                {
                  // Added filtering to show only drivers of the current team (e.g. Mercedes drivers under Mercedes team)
                  drivers
                    .filter((driver) => driver.team_name == team.team_name)
                    .map((driver) => (
                      <li key={driver.id} className="driver-name">
                        {driver.first_name + " " + driver.last_name}
                      </li>
                    ))
                }
              </ul>
            </div>
            <img
              className="team-card-vehicle-image"
              src={team.vehicle_image}
              alt={`${team.team_name} vehicle`}
              style={{ width: "200px", height: "auto" }} //TODO remove style later
            />
            <img
              className="team-card-logo-image"
              src={team.team_logos}
              alt={`${team.team_name} logo`}
              style={{
                //TODO remove style later
                width: "50px",
                height: "auto",
                backgroundColor: `#${team.team_color}`,
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
