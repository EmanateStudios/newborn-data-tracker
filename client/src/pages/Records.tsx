import { useQuery } from "@apollo/client";
import { GET_USER_RECORDS } from "../api/requests";
import { record } from "../api/types";

export function Records() {
  const { loading, data, error } = useQuery(GET_USER_RECORDS, {
    variables: {
      id: "d38f79c5-6814-45f5-ac7a-5fca7979fd89",
    },
  });

  if (loading) return <div className="contentContainer">Loading...</div>;
  if (error) return <div className="contentContainer">{`error: ${error}`}</div>;

  const AllRecords = (recordData: record[]) => {
    console.log(recordData);
    return recordData.map((item) => (
      <li key={item.id}>{`${item.date}, poop? : ${
        item.bowelMovement ? "yup" : "not yet"
      }`}</li>
    ));
  };

  return (
    <div>
      <div className="contentContainer">
        <h1>Records</h1>
      </div>
      <ul>{AllRecords(data?.User[0]?.Records)}</ul>
    </div>
  );
}
