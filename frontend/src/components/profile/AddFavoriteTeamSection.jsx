import useMutation from "../../api/useMutation";
import useQuery from "../../api/useQuery";
import { useTheme } from "../ThemeContext";

/**
 * AddFavoriteTeamSection provides a dropdown to select and add a favorite team.
 * Submits the selected team using a mutation hook.
 */
export default function AddFavoriteTeamSection() {
  const { theme, oppositeTheme } = useTheme();
  // Fetch all teams
  const { data: teams, loading, error } = useQuery("/teams", "teams");
  // Mutation hook for adding favorite team
  const { mutate: addFavoriteTeam } = useMutation("POST", "/teams", [
    "profile",
  ]); // Expects team "id" to be sent as a request body

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!teams) return <p>No teams found.</p>;

  return (
    <>
      <p>No favorite team is added.</p>

      <div className="dropdown">
        <button
          className={`btn btn-outline-${oppositeTheme} btn-sm dropdown-toggle`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Your Favorite Team
        </button>
        <ul className="dropdown-menu" data-bs-theme={theme}>
          {/* List all teams as dropdown items */}
          {teams.map((team) => (
            <li key={team.id}>
              <button
                className="dropdown-item dropdown-item-team"
                type="button"
                onClick={() => addFavoriteTeam({ id: team.id })}
              >
                <img
                  style={{ backgroundColor: `#${team.team_color}` }}
                  className="dropdown-team-logo"
                  src={team.team_logos}
                  alt={`${team.team_name} logo`}
                />
                {team.team_name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
