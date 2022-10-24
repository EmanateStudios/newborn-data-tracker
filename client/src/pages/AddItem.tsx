import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { GET_USER_RECORDS, INSERT_RECORD } from "../api/requests";
import { record } from "../api/types";
import { DateTime } from "luxon";
// --- ICONS ---
import { FiCalendar, FiWatch } from "react-icons/fi";
import { FaPoo } from "react-icons/fa";
import { BsFillDropletFill, BsHourglassSplit } from "react-icons/bs";
import { GiVomiting, GiChemicalTank } from "react-icons/gi";
import { IoIosBeaker, IoIosTimer } from "react-icons/io";

export function AddItem() {
  const currentDate = DateTime.now();
  const currentTime = DateTime.now();

  const [addRecordToUser, { loading, data, error }] = useMutation(
    INSERT_RECORD,
    {
      onCompleted: (completedData) => {
        console.log(`SUCCESSFUL RECORD INSERTION`);
        console.log(completedData);
        setRecord(initialValues);
      },
    }
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userId = localStorage.getItem("id");
    if (userId) {
      addRecordToUser({
        variables: {
          objects: {
            date: record.date,
            time: record.time.toLocaleString(DateTime.TIME_SIMPLE),
            leftBreast: record.leftBreast || 0,
            rightBreast: record.rightBreast || 0,
            void: record.void || false,
            vomit_spitUp: record.vomit_spitUp || false,
            pumpTime: record.pumpTime || 0,
            supplementQuantity: record.supplementQuantity || 0,
            supplementType: record.supplementType || "",
            user_id: userId,
            bowelMovement: record.bowelMovement || false,
          },
        },
        update(cache, { data }) {
          const { Record }: any = cache.readQuery({
            query: GET_USER_RECORDS,
            variables: {
              id: userId,
            },
          });
          console.log(`CACHE RECORD`);
          console.log(Record);
          console.log(`ADDED DATA RECORD`);
          console.log(data.insert_Record.returning[0]);
          console.log(`COMBINED`);
          console.log([data.insert_Record.returning[0], ...Record]);

          cache.writeQuery({
            query: GET_USER_RECORDS,
            data: {
              Record: [data.insert_Record.returning[0], ...Record],
            },
            variables: {
              id: userId,
            },
          });
        },
      });
    } else {
      console.log("cannot find id");
    }
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

    setRecord({
      ...record,
      [keyUpdate]: valueUpdate,
    });
  };

  return (
    <>
      <div className="contentContainer">
        <h1>Add Record</h1>
        <form onSubmit={handleSubmit}>
          {/*==================== DATE AND TIME ====================*/}
          <div
            className="cards"
            style={{
              border: "1px solid rgb(200,200,200)",
              paddingBottom: "10px",
              paddingLeft: "10px",
              borderRadius: "5px",
              backgroundColor: "rgb(240,240,240)",
            }}
          >
            <h2>Date and Time</h2>
            <div style={{ display: "flex" }}>
              {/* ---- DATE ---- */}
              <div
                className="checkBoxContainer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
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
                  backgroundColor: "white",
                }}
              >
                <FiWatch size={"25px"} style={{ marginRight: "15px" }} />
                <input
                  type="time"
                  name="time"
                  value={`${record.time.toLocaleString(
                    DateTime.TIME_24_SIMPLE
                  )}`}
                  onChange={(e) => updateRecordState(e.target)}
                  style={{ width: "30vw" }}
                />
              </div>
            </div>
          </div>
          {/*==================== PEE AND POO ====================*/}
          <div
            className="cards"
            style={{
              border: "1px solid rgb(200,200,200)",
              marginTop: "20px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              borderRadius: "5px",
              backgroundColor: "rgb(240,240,240)",
            }}
          >
            <h2>Excretions</h2>
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
                  backgroundColor: "white",
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
                  backgroundColor: "white",
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
                  backgroundColor: "white",
                }}
              >
                <GiVomiting
                  size={"25px"}
                  style={{ color: "rgb(17, 84, 35)" }}
                />
                <input
                  type="checkbox"
                  name="vomit_spitUp"
                  checked={record.vomit_spitUp}
                  onChange={(e) => updateRecordState(e.target)}
                  style={{ width: "10vw" }}
                />
              </div>
            </div>
          </div>
          {/*==================== BOOBIES / FEEDING TIMES====================*/}
          <div
            className="cards"
            style={{
              marginTop: "20px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>Feeding Times (minutes)</h2>
            <div style={{ display: "flex" }}>
              {/* ---- LEFT BOOB TIME ---- */}
              <div
                className="checkBoxContainer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <p style={{ margin: "0px 10px" }}>L</p>
                <BsHourglassSplit size={"20px"} color={"rgb(171, 104, 65)"} />
                <input
                  type="input"
                  name="leftBreast"
                  value={record.leftBreast}
                  onChange={(e) => updateRecordState(e.target)}
                  style={{ width: "20vw", marginLeft: "10px" }}
                />
              </div>
              {/* ---- RIGHT BOOB TIME ---- */}
              <div
                className="checkBoxContainer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <p style={{ margin: "0px 10px" }}>R</p>
                <BsHourglassSplit size={"20px"} color={"rgb(171, 104, 65)"} />
                <input
                  type="input"
                  name="rightBreast"
                  value={record.rightBreast}
                  onChange={(e) => updateRecordState(e.target)}
                  style={{ width: "20vw", marginLeft: "10px" }}
                />
              </div>
            </div>
          </div>
          {/*==================== SUPPLEMENTALS ====================*/}
          <div
            className="cards"
            style={{
              marginTop: "20px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>Supplementals</h2>
            {/* ---- TYPE OF SUPPLEMENT (IE. FORMULA) ---- */}
            <div
              className="checkBoxContainer"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: "0px 10px" }}>Type</p>
              <GiChemicalTank size={"20px"} color={"rgb(171, 104, 65)"} />
              <input
                type="input"
                placeholder="ie. formula (optional)"
                name="supplementType"
                value={record.supplementType}
                onChange={(e) => updateRecordState(e.target)}
                style={{ margin: "0px 10px", display: "flex", flexGrow: 1 }}
              />
            </div>
            {/* ---- SUPPLEMENT QUANTITY ---- */}
            <div
              className="checkBoxContainer"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: "0px 10px" }}>Qty (ml)</p>
              <IoIosBeaker size={"20px"} color={"rgb(171, 104, 65)"} />
              <input
                type="input"
                placeholder="quantity in ml (optional)"
                name="supplementQuantity"
                value={record.supplementQuantity}
                onChange={(e) => updateRecordState(e.target)}
                style={{ margin: "0px 10px", display: "flex", flexGrow: 1 }}
              />
            </div>
            {/* ---- PUMP TIME ---- */}
            <div
              className="checkBoxContainer"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: "0px 10px" }}>Pump (min)</p>
              <IoIosTimer size={"20px"} color={"rgb(171, 104, 65)"} />
              <input
                type="input"
                placeholder="time in minutes (optional)"
                name="pumpTime"
                value={record.pumpTime}
                onChange={(e) => updateRecordState(e.target)}
                style={{ margin: "0px 10px", display: "flex", flexGrow: 1 }}
              />
            </div>
          </div>
          {/*==================== SUBMIT ====================*/}
          <div style={{ textAlign: "center" }}>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
