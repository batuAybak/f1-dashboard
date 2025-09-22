import { useParams } from "react-router";
import useQuery from "../../api/useQuery";

export default function GrandPrixDetails() {
  const { meetingKey } = useParams();
  //   const navigate = useNavigate();
  const { data, loading, error } = useQuery(
    `/calendar/${meetingKey}`,
    "grandPrix"
  );

  const {
    data: driver,
    loadingDriver,
    errorDriver,
  } = useQuery("/drivers", "drivers");

  if (loading || !data || loadingDriver) return <p>Loading...</p>;
  if (error || errorDriver) return <p>Error! {error}</p>;

  const race = data[0];
  const results = data[1];

  console.log(results);

  const driverName = (number) => {
    const name = driver?.find((driver) => driver?.driver_number === number);
    // console.log(name?.driver_number);
    const fullName = name?.first_name + " " + name?.last_name;
    return fullName;
  };

  return (
    <>
      <section className="calendar-details-main">
        <div className="race-page">
          <img src={race.image} alt="Image link" className="race-images" />
          <div className="race-details">
            <h1 className="race-name">{race.meeting_name}</h1>
            <div className="race-country">
              <h2 className="race-country-name">{race.country_name}</h2>
              <h2 className="race-country-code">({race.country_code})</h2>
            </div>
            <p1 className="race-location">{race.location}</p1>
            <p2 className="race-date">
              {new Date(race.date_start).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p2>
          </div>
        </div>
      </section>
      <section>
        <h2>Race Results</h2>
        <table>
          <thead>
            <tr>
              {results.length < 1 ? (
                <th>Race has not started</th>
              ) : (
                <>
                  <th>Pos</th>
                  <th>Driver #</th>
                  <th>Driver Name</th>
                  <th>Points</th>
                  <th>Gap</th>{" "}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                {/* <tr key={index}> */}
                <td>{index + 1}</td>
                <td>{result.driver_number}</td>
                <td>{driverName(result.driver_number)}</td>
                <td>{result.points}</td>
                <td>
                  {result.dnf || result.dns || result.dsq
                    ? "dnf"
                    : result.gap_to_leader}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
