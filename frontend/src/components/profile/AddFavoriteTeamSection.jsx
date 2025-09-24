import useMutation from "../../api/useMutation";
import useQuery from "../../api/useQuery";

export default function AddFavoriteTeamSection() {
  const { data: teams, loading, error } = useQuery("/teams", "teams");

  const { mutate: addFavoriteTeam } = useMutation("POST", "/teams", [
    "profile",
  ]); // Expects team "id" to be sent as a request body

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!teams) return <p>No teams found.</p>;

  const submitFavoriteTeam = (FormData) => {
    const teamId = FormData.get("teamId");
    addFavoriteTeam({ id: teamId });
  };

  return (
    <>
      <p>No favorite team is added.</p>
      <form action={submitFavoriteTeam}>
        <select name="teamId" id="teams" defaultValue="" required>
          <option value="" disabled>
            Select your Favorite Team
          </option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.team_name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">Add Favorite Driver</button>
      </form>
    </>
  );
}
