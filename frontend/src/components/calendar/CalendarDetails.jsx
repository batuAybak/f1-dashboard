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
    <div>
      <p>{data.circuit_short_name}</p>
    </div>
  );
}
