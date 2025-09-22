import useQuery from "../../api/useQuery";
import TeamList from "./TeamList";

export default function TeamsPage() {
  const { data: teams, loadingTeams, errorTeams } = useQuery("/teams", "teams");
  if (loadingTeams) return <p>Loading...</p>;
  if (errorTeams) return <p>Error: {errorTeams}</p>;
  if (!teams) return <p>No teams found.</p>;

  return (
    <>
      <h1 className="teams-header">Teams</h1>
      <ul className="teams-list">
        {teams.map((team) => (
          <TeamList key={team.id} team={team} />
        ))}
      </ul>
    </>
  );
}
