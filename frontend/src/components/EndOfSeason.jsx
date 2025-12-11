import useQuery from "../api/useQuery";

export default function EndOfSeason() {
  const { data, loading, error } = useQuery("/drivers", "drivers");

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;
  const driverChampion = data.find((driver) => driver.first_name === "Lando");

  return (
    <>
      <div className="next-race-section">
        <h2>
          🏁 {driverChampion.first_name} {driverChampion.last_name} is the 2025
          Formula 1 World Champion 🏁
        </h2>
        {
          <div className="next-race-container">
            <img
              src={
                "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Abu_Dhabi/2250554872.webp"
              }
              alt="race link"
              className="next-race-image"
            />
            <div className="next-race-details">
              <p>No upcoming races until 2026 season calendar is available.</p>
            </div>
          </div>
        }
      </div>
    </>
  );
}
