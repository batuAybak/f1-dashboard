import { useParams } from "react-router";
import useQuery from "../../api/useQuery";

export default function GrandPrixDetails() {
  const { circuit } = useParams();
  //   const navigate = useNavigate();
  const { data, loading, error } = useQuery(
    `/calendar/${circuit}`,
    "grandPrix"
  );

  console.log(data);

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error! {error}</p>;

  return (
    <section className="calendar-details-main">
      <div className="race-page">
        <img src={data.image} alt="Image link" className="race-images" />
        <div className="race-details">
          <h1 className="race-name">{data.meeting_name}</h1>
          <div className="race-country">
            <h2 className="race-country-name">{data.country_name}</h2>
            <h2 className="race-country-code">({data.country_code})</h2>
          </div>
          <p1 className="race-location">{data.location}</p1>
          <p2 className="race-date">
            {new Date(data.date_start).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p2>
        </div>
      </div>
    </section>
  );
}
