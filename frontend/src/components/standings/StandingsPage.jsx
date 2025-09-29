import { useNavigate } from "react-router";
import useQuery from "../../api/useQuery";

export default function StandingsPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery("/standings", "standings");

  const {
    data: driver,
    loadingDriver,
    errorDriver,
  } = useQuery("/drivers", "drivers");

  const { data: team } = useQuery("/teams", "teams");

  if (loading || !data || loadingDriver) return <p>Loading...</p>;
  if (error || errorDriver) return <p>Error! {error}</p>;

  // console.log(data);
  console.log(driver);
  console.log(team);

  const orderStandings = data.sort((a, b) => b.points - a.points);
  // console.log(orderStandings);

  const driverName = (number) => {
    const name = driver?.find((driver) => driver?.driver_number === number);
    const fullName = name?.first_name + " " + name?.last_name;
    return fullName;
  };

  const teamPoints = () => {
    const teamObj = {};

    orderStandings.forEach((standing) => {
      const driverObj = driver?.find(
        (driver) => driver?.driver_number === standing.driver_number
      );

      if (!teamObj[driverObj?.team_name]) {
        teamObj[driverObj?.team_name] = {
          team_name: driverObj?.team_name,
          points: 0,
        };
      }

      teamObj[driverObj?.team_name].points += standing.points || 0;
    });

    return Object.values(teamObj).sort((a, b) => b.points - a.points);
  };

  const teamStandings = teamPoints();

  return (
    <div className="standings-page">
      <section className="driver-standings-section">
        <h2 className="results-header">Driver Standings</h2>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver #</th>
              <th>Driver Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {orderStandings.map((standings, index) => (
              <tr
                key={standings.driver_number}
                onClick={() =>
                  navigate(`/standings/${standings.driver_number}`)
                }
              >
                <td>{index + 1}</td>
                <td>{standings.driver_number}</td>
                <td>{driverName(standings.driver_number)}</td>
                <td>{standings.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="team-standings-section">
        <h2 className="results-header">Team Standings</h2>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {teamStandings.map((team, index) => (
              <tr key={team.team_name}>
                <td>{index + 1}</td>
                <td>{team.team_name}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
