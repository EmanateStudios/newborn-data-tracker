import { useQuery } from "@apollo/client";
import { GET_USER_RECORDS } from "../api/requests";
import { record } from "../api/types";

export function Records() {
  const { loading, data, error } = useQuery(GET_USER_RECORDS);

  if (loading) return <div className="contentContainer">Loading...</div>;
  if (error) return <div className="contentContainer">{`error: ${error}`}</div>;

  const AllRecords = (recordData: record[]) => {
    return recordData.map((item) => (
      <li key={item.id}>{`${item.date}, poop? : ${
        item.bowelMovement ? "yup" : "not yet"
      }`}</li>
    ));
  };

  return (
    <div>
      <div className="contentContainer">Recrds</div>
      <ul>{AllRecords(data?.Record)}</ul>
    </div>
  );
}
