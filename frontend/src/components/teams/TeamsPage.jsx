import useQuery from "../../api/useQuery";
import TeamList from "./TeamList";

/**
 * TeamsPage fetches and displays a list of all teams.
 * Uses TeamList to render each team card.
 */
export default function TeamsPage() {
  // Fetch all teams
  const { data: teams, loadingTeams, errorTeams } = useQuery("/teams", "teams");
  if (loadingTeams) return <p>Loading...</p>;
  if (errorTeams) return <p>Error: {errorTeams}</p>;
  if (!teams) return <p>No teams found.</p>;

  return (
    <>
      <h2 className="teams-header">Teams</h2>
      <ul className="teams-list">
        {/* Render a TeamList card for each team */}
        {teams.map((team) => (
          <TeamList key={team.id} team={team} />
        ))}
      </ul>
    </>
  );
}
