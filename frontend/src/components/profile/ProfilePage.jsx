import useQuery from "../../api/useQuery.js";

export default function profilePage() {
  const { data: user, loading, error } = useQuery("/users/profile", "users");

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found.</p>;
  if (error) return <p>Error! {error}</p>;

  console.log(user);

  return (
    <>
      <h1 className="welcome-message">
        Welcome, {user?.user.first_name} {user?.last_name}!
      </h1>
      <p>{user?.userFavorites.driver_id}</p>
    </>
  );
}
