import useMutation from "../../api/useMutation";
import useQuery from "../../api/useQuery";

export default function AddFavoriteDriverSection() {
  const { data: drivers, loading, error } = useQuery("/drivers", "drivers");

  const { mutate: addFavoriteDriver } = useMutation("POST", `/drivers`, [
    "profile",
  ]); //Expects "driver_number" to be sent as request body

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!drivers) return <p>No drivers found.</p>;

  const submitFavoriteDriver = (FormData) => {
    const driverNumber = FormData.get("driverNumber"); //Get the driver number from form submission
    addFavoriteDriver({ driver_number: driverNumber }); // Pass driver_number as obj
  };

  return (
    <>
      <p>No favorite driver is added.</p>

      <form action={submitFavoriteDriver}>
        <select name="driverNumber" id="drivers" defaultValue="" required>
          <option value="" disabled>
            Select Your Favorite Driver
          </option>
          {drivers.map((driver) => (
            <option key={driver.drive_number} value={driver.driver_number}>
              {driver.first_name} {driver.last_name}
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
