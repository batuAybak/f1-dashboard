import useQuery from "../../api/useQuery.js";
import useMutation from "../../api/useMutation.js";
import { useNavigate } from "react-router";
import DriverList from "../drivers/DriverList.jsx";
import TeamList from "../teams/TeamList.jsx";
import AddFavoriteDriverSection from "./AddFavoriteDriverSection.jsx";
import AddFavoriteTeamSection from "./AddFavoriteTeamSection.jsx";

export default function ProfilePage() {
  const { data: user, loading, error } = useQuery("/users/profile", "profile"); // Fetch user profile with favorite driver and team

  const userFavoriteDriver = user?.userFavoriteDriver;
  const userFavoriteTeam = user?.userFavoriteTeam;

  // API call to remove favorite team and driver.
  // It doesn't need any JSON body data
  // since user ID and team ID are obtained from middleware on the backend.
  // Therefore, when calling mutate for these APIs,
  // we don't need to pass anything in as an argument.
  const { mutate: removeTeam } = useMutation(
    "DELETE",
    `/teams/${userFavoriteTeam?.id}`,
    ["profile"]
  );
  const { mutate: removeDriver } = useMutation(
    "DELETE",
    `/drivers/${userFavoriteDriver?.driver_number}`,
    ["profile"]
  );

  const navigate = useNavigate();

  if (!user) return <p>No user data</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <section className="profile-main">
      <div>
        <h1 className="welcome-message">
          Welcome, {user?.user.first_name} {user?.user.last_name}!
        </h1>
      </div>

      {/* ----- Favorite Driver ----- */}
      <div className="favorite-driver">
        <h2>Favorite Driver</h2>
        {userFavoriteDriver === undefined ? (
          <AddFavoriteDriverSection />
        ) : (
          <>
            <DriverList
              driver={userFavoriteDriver}
              teamName={userFavoriteDriver.team_name}
            />
            <br />
            <button onClick={() => removeDriver()}>
              Remove Favorite Driver
            </button>
          </>
        )}
      </div>

      {/* ----- Favorite Team ----- */}
      <div className="favorite-team">
        <h2>Favorite Team</h2>
        {userFavoriteTeam === undefined ? (
          <>
            <p>No favorite teams added.</p>
            <button onClick={() => navigate("/teams")}>
              Add a Favorite Team
            </button>
          </>
        ) : (
          <>
            <TeamList team={userFavoriteTeam} />
            <br />
            <button onClick={() => removeTeam()}>Remove Favorite Team</button>
          </>
        )}
      </div>
    </section>
  );
}
