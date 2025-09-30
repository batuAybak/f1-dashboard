import useMutation from "../../api/useMutation";
import useQuery from "../../api/useQuery";

export default function AddFavoriteTeamSection({ classTheme, theme }) {
  const { data: teams, loading, error } = useQuery("/teams", "teams");

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
          className={`btn btn-outline-${classTheme} btn-sm dropdown-toggle`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Your Favorite Team
        </button>
        <ul className="dropdown-menu" data-bs-theme={theme}>
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
