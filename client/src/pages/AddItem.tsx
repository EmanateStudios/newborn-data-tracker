import { useState } from "react";
import { useMutation } from "@apollo/client";
import { INSERT_RECORD } from "../api/requests/records";
import { record } from "../api/types";
import { DateTime } from "luxon";
// --- ICONS ---
import { FiCalendar, FiWatch } from "react-icons/fi";
import { FaPoo } from "react-icons/fa";
import { BsFillDropletFill } from "react-icons/bs";
import { GiVomiting } from "react-icons/gi";

export function AddItem() {
  const currentDate = DateTime.now();
  // const currentTime = currentDate.toLocaleString(DateTime.TIME_SIMPLE);
  const currentTime = DateTime.now();

  const [getUserRecords, { loading, data, error }] = useMutation(
    INSERT_RECORD,
    {
      onCompleted: (completedData) => {
        console.log(`SUCCESSFUL RECORD INSERTION`);
        console.log(completedData);
      },
    }
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getUserRecords({
      variables: {
        objects: {
          date: record.date,
          time: record.time,
          leftBreast: record.leftBreast || 0,
          rightBreast: record.rightBreast || 0,
          void: record.void || false,
          vomit_spitUp: record.vomit_spitUp || false,
          pumpTime: record.pumpTime || 0,
          supplementQuantity: record.supplementQuantity || 0,
          supplementType: record.supplementType || "",
          user_id: record.user_id || "50af37d4-4a87-4ee8-8c4b-7d3e8f0b7a91",
          bowelMovement: record.bowelMovement || false,
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
    const keyUpdate = update.name;
    const valueUpdate =
      update.type === "checkbox" ? update.checked : update.value;

    // console.log(update);
    // console.log(update.type);
    // console.log(keyUpdate);
    console.log(valueUpdate);
    console.log({
      ...record,
      [keyUpdate]: valueUpdate,
    });
    setRecord({
      ...record,
      [keyUpdate]: valueUpdate,
    });
  };

  return (
    <div className="contentContainer">
      <h1>Add Record</h1>
      <form onSubmit={handleSubmit}>
        {/*==================== DATE AND TIME ====================*/}
        {/* ---- DATE ---- */}
        <div style={{ display: "flex" }}>
          <div
            className="checkBoxContainer"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FiCalendar size={"25px"} style={{ marginRight: "15px" }} />
            <input
              type="date"
              name="date"
              value={`${record.date.toFormat("yyyy-MM-dd")}`}
              onChange={(e) => updateRecordState(e.target)}
              style={{ width: "30vw" }}
            />
          </div>
          {/* ---- TIME ---- */}
          <div
            className="checkBoxContainer"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FiWatch size={"25px"} style={{ marginRight: "15px" }} />
            <input
              type="time"
              name="time"
              value={`${record.time.toLocaleString(DateTime.TIME_24_SIMPLE)}`}
              onChange={(e) => updateRecordState(e.target)}
              style={{ width: "30vw" }}
            />
          </div>
        </div>
        {/*==================== PEE AND POO ====================*/}
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {/* ---- PEE ---- */}
          <div
            className="checkBoxContainer"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BsFillDropletFill
              size={"25px"}
              style={{ color: "rgb(153,163,34)" }}
            />
            <input
              type="checkbox"
              name="void"
              checked={record.void}
              onChange={(e) => updateRecordState(e.target)}
              style={{
                width: "10vw",
              }}
            />
          </div>
          {/* ---- POO ---- */}
          <div
            className="checkBoxContainer"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FaPoo size={"25px"} style={{ color: "rgb(122, 72, 6)" }} />
            <input
              type="checkbox"
              name="bowelMovement"
              checked={record.bowelMovement}
              onChange={(e) => updateRecordState(e.target)}
              style={{ width: "10vw" }}
            />
          </div>
          {/* ---- SPIT UP / VOMIT ---- */}
          <div
            className="checkBoxContainer"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GiVomiting size={"25px"} style={{ color: "rgb(17, 84, 35)" }} />
            <input
              type="checkbox"
              name="vomit_spitUp"
              checked={record.vomit_spitUp}
              onChange={(e) => updateRecordState(e.target)}
              style={{ width: "10vw" }}
            />
          </div>
        </div>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
