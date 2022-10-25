import { useQuery } from "@apollo/client";
import { RecordBox } from "../components/RecordBox";
import { GET_USER_RECORDS } from "../api/requests";
import { record } from "../api/types";

export function Records() {
  const userId = localStorage.getItem("id");

  const { loading, data, error } = useQuery(GET_USER_RECORDS, {
    variables: {
      id: userId,
    },
  });

  if (loading) return <div className="contentContainer">Loading...</div>;
  if (error) return <div className="contentContainer">{`error: ${error}`}</div>;

  const AllRecords = (recordData: record[]) => {
    return recordData.map((item) => <RecordBox record={item} key={item.id} />);
  };

  return (
    <div className="contentContainer">
      <h1>Records</h1>

      <ul>{AllRecords(data?.Record)}</ul>
    </div>
  );
}
