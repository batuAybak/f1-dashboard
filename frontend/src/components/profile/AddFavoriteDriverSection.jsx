import useMutation from "../../api/useMutation";
import useQuery from "../../api/useQuery";
import { useTheme } from "../ThemeContext";

/**
 * AddFavoriteDriverSection provides a dropdown to select and add a favorite driver.
 * Submits the selected driver using a mutation hook.
 */
export default function AddFavoriteDriverSection() {
  const { theme, oppositeTheme } = useTheme();
  // Fetch all drivers
  const { data: drivers, loading, error } = useQuery("/drivers", "drivers");
  // Mutation hook for adding favorite driver
  const { mutate: addFavoriteDriver } = useMutation("POST", `/drivers`, [
    "profile",
  ]); // Expects "driver_number" to be sent as request body

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!drivers) return <p>No drivers found.</p>;

  return (
    <>
      <p>No favorite driver is added.</p>

      <div className="dropdown">
        <button
          className={`btn btn-outline-${oppositeTheme} btn-sm dropdown-toggle`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Your Favorite Driver
        </button>
        <ul className="dropdown-menu" data-bs-theme={theme}>
          {/* List all drivers as dropdown items */}
          {drivers.map((driver) => (
            <li key={driver.driver_number}>
              <button
                className="dropdown-item dropdown-item-driver"
                type="button"
                onClick={() =>
                  addFavoriteDriver({ driver_number: driver.driver_number })
                }
              >
                <img
                  className="dropdown-driver-headshot"
                  src={driver.headshot_url}
                  alt={`${driver.last_name} headshot`}
                />
                {driver.first_name} {driver.last_name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
