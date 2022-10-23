import { useState } from "react";
import { useMutation } from "@apollo/client";
import { INSERT_RECORD } from "../api/requests/records";
import { record } from "../api/types";
import { DateTime } from "luxon";

export function AddItem() {
  const currentDate = DateTime.now();
  // const currentTime = currentDate.toLocaleString(DateTime.TIME_SIMPLE);
  const currentTime = DateTime.now();

  const [getUserRecords, { loading, data, error }] = useMutation(INSERT_RECORD);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getUserRecords({
      variables: {
        objects: {
          date: currentDate,
          time: currentTime,
          leftBreast: 0,
          rightBreast: 0,
          void: false,
          vomit_spitUp: false,
          pumpTime: 0,
          supplementQuantity: 0,
          supplementType: "",
          user_id: "",
          bowelMovement: false,
        },
      },
    });
  };

  const initialValues: record = {
    date: currentDate,
    time: currentTime,
    leftBreast: 0,
    rightBreast: 0,
    void: false,
    vomit_spitUp: false,
    pumpTime: 0,
    supplementQuantity: 0,
    supplementType: "",
    user_id: "",
    bowelMovement: false,
  };

  const [record, setRecord] = useState<record>(initialValues);
  const updateRecordState = (update: any) => {
    console.log(update.name);
    console.log(update.value);
  };
  return (
    <div className="contentContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={`${record.date.toFormat("yyyy-MM-dd")}`}
            onChange={(e) => updateRecordState(e.target)}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={`${record.time.toLocaleString(DateTime.TIME_24_SIMPLE)}`}
            onChange={(e) => updateRecordState(e.target)}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
