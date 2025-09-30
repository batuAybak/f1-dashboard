import useQuery from "../../api/useQuery.js";
import useMutation from "../../api/useMutation.js";
import DriverList from "../drivers/DriverList.jsx";
import TeamList from "../teams/TeamList.jsx";
import AddFavoriteDriverSection from "./AddFavoriteDriverSection.jsx";
import AddFavoriteTeamSection from "./AddFavoriteTeamSection.jsx";
import { useTheme } from "../ThemeContext.jsx";

export default function ProfilePage() {
  const { data: user, loading, error } = useQuery("/users/profile", "profile"); // Fetch user profile with favorite driver and team
  const { theme } = useTheme();
  const classTheme = theme === "light" ? "dark" : "light";
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

  if (!user) return <p>No user data</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <div className="profile-main">
      <div className="profile-header">
        <h2 className="welcome-message">
          Welcome, {user?.user.first_name} {user?.user.last_name}!
        </h2>
        <p>Use the sections below to manage your favorite driver and team.</p>
      </div>

      <div className="favorites">
        {/* ----- Favorite Driver ----- */}
        <section className="favorite-driver">
          <h3>Favorite Driver</h3>
          {userFavoriteDriver === undefined ? (
            <AddFavoriteDriverSection classTheme={classTheme} theme={theme} />
          ) : (
            <>
              <DriverList
                driver={userFavoriteDriver}
                teamName={userFavoriteDriver.team_name}
              />
              <br />
              <button
                className={`btn btn-outline-${classTheme} btn-sm`}
                onClick={() => removeDriver()}
              >
                Remove Favorite Driver
              </button>
            </>
          )}
        </section>

        {/* ----- Favorite Team ----- */}
        <section className="favorite-team">
          <h3>Favorite Team</h3>
          {userFavoriteTeam === undefined ? (
            <AddFavoriteTeamSection classTheme={classTheme} theme={theme} />
          ) : (
            <>
              <TeamList team={userFavoriteTeam} />
              <br />
              <button
                className={`btn btn-outline-${classTheme} btn-sm`}
                onClick={() => removeTeam()}
              >
                Remove Favorite Team
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
