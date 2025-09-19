import useQuery from "../../api/useQuery.js";
import useMutation from "../../api/useMutation.js";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const { data: user, loading, error } = useQuery("/users/profile", "users");
  const { mutate: remove } = useMutation("DELETE", "/users/profile", "driver");
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found.</p>;
  if (error) return <p>Error! {error}</p>;

  console.log(user.userFavorites);

  return (
    <section className="profile-main">
      <div>
        <h1 className="welcome-message">
          Welcome, {user?.user.first_name} {user?.user.last_name}!
        </h1>
      </div>
      <div className="favorite-driver">
        <h2>Favorite Drivers</h2>
        {user.userFavorites === undefined ? (
          <>
            <p>No favorite drivers added.</p>
            <button onClick={() => navigate("/drivers")}>
              Add a Favorite Driver
            </button>
          </>
        ) : (
          <>
            <p>
              {user.userFavorites.first_name} {user.userFavorites.last_name}
              {user.userFavorites.team_name} {user.userFavorites.driver_number}
            </p>
            <button onClick={() => remove(user.userFavorites.driver_number)}>
              Remove Favorite Driver
            </button>
          </>
        )}
      </div>
      <div className="favorite-team">
        <h2>Favorite Team</h2>
        {user.userFavorites === undefined ? (
          <>
            <p>No favorite teams added.</p>
            <button onClick={() => navigate("/teams")}>
              Add a Favorite Team
            </button>
          </>
        ) : (
          <>
            <p>
              {user.userFavorites.team_name} {user.userFavorites.team_logos}
            </p>
            <button onClick={() => remove(user.userFavorites.driver_number)}>
              Remove Favorite Team
            </button>
          </>
        )}
      </div>
    </section>
  );
}
