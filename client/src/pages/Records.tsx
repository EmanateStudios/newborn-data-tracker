import { useQuery } from "@apollo/client";
import { GET_ALL_RECORDS } from "../api/requests";

interface record {
  bowelMovement?: boolean | null;
  date: Date;
  id: string;
  leftBreast?: null;
  pumpTime?: Number | null;
  rightBreast?: null;
  supplementQuantity?: Number | null;
  supplementType?: boolean | null;
  time: Date;
  user_id: string;
  void?: boolean;
  vomit_spitUp?: boolean;
}

export function Records() {
  const { loading, data, error } = useQuery(GET_ALL_RECORDS);

  if (loading) return <p>loading</p>;
  if (error) return <p>{`error: ${error}`}</p>;

  const AllRecords = (recordData: record[]) => {
    return recordData.map((item) => (
      <li key={item.id}>{`${item.date}, poop? : ${
        item.bowelMovement ? "yup" : "not yet"
      }`}</li>
    ));
  };

  return (
    <div>
      <div>Records</div>
      <ul>{AllRecords(data?.Record)}</ul>
    </div>
  );
}
