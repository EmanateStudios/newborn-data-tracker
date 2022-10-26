import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_USER_RECORDS, INSERT_RECORD } from "../api/requests";
import { record } from "../api/types";
import { DateTime } from "luxon";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
// --- ICONS ---
import { FiCalendar, FiWatch } from "react-icons/fi";
import { FaPoo } from "react-icons/fa";
import { BsFillDropletFill, BsHourglassSplit } from "react-icons/bs";
import { GiVomiting, GiChemicalTank } from "react-icons/gi";
import { IoIosBeaker, IoIosTimer } from "react-icons/io";
// --- loader
import loader from "../imgs/loader.gif";

export function AddItem() {
  const navigate = useNavigate();

  const currentDate = DateTime.now();
  const currentTime = DateTime.local();

  const [addRecordToUser, { loading, data, error }] = useMutation(
    INSERT_RECORD,
    {
      onCompleted: (completedData) => {
        console.log(`SUCCESSFUL RECORD INSERTION`);
        setRecord(initialValues);
        setModalState(true);
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
          try {
            const { Record }: any = cache.readQuery({
              query: GET_USER_RECORDS,
              variables: {
                id: userId,
              },
            });

            cache.writeQuery({
              query: GET_USER_RECORDS,
              data: {
                Record: [data.insert_Record.returning[0], ...Record],
              },
              variables: {
                id: userId,
              },
            });
          } catch (err) {
            console.log(`cannot manipulate cache at this time, error:${err}`);
          }
        },
      });
    } else {
      console.log("cannot find id");
    }
  };

  const initialValues: record = {
    date: currentDate.toFormat("yyyy-MM-dd"),
    time: currentTime,
    leftBreast: "",
    rightBreast: "",
    void: false,
    vomit_spitUp: false,
    pumpTime: "",
    supplementQuantity: "",
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

  const [modalState, setModalState] = useState(false);
  const message = "Successfully added a record.";
  return (
    <>
      <Modal
        state={modalState}
        setState={setModalState}
        title={"Success"}
        action={() => navigate("/Records")}
        message={message}
      />
      <div className="contentContainer">
        <h1>Add Record</h1>

        <form onSubmit={handleSubmit}>
          {/*==================== DATE AND TIME ====================*/}
          {loading ? (
            <img
              src={loader}
              alt="Loading..."
              style={{ width: "90vw", alignSelf: "center" }}
            />
          ) : (
            <>
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
                      value={`${record.date}`}
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
                      color="rgb(209, 180, 50)"
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
                    <FaPoo size={"25px"} color="rgb(122, 72, 6)" />
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
                    <GiVomiting size={"25px"} color="rgb(17, 84, 35)" />
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
                    <BsHourglassSplit
                      size={"20px"}
                      color={"rgb(3, 144, 252)"}
                    />
                    <input
                      type="input"
                      placeholder="ie. 15"
                      inputMode="numeric"
                      pattern="[0-9]*"
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
                    <BsHourglassSplit
                      size={"20px"}
                      color={"rgb(3, 144, 252)"}
                    />
                    <input
                      type="input"
                      name="rightBreast"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="ie. 15"
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
                  <GiChemicalTank size={"20px"} color={"rgb(3, 144, 252)"} />
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
                  <IoIosBeaker size={"20px"} color={"rgb(3, 144, 252)"} />
                  <input
                    type="input"
                    placeholder="quantity in ml (optional)"
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                  <IoIosTimer size={"20px"} color={"rgb(3, 144, 252)"} />
                  <input
                    type="input"
                    placeholder="time in minutes (optional)"
                    name="pumpTime"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={record.pumpTime}
                    onChange={(e) => updateRecordState(e.target)}
                    style={{ margin: "0px 10px", display: "flex", flexGrow: 1 }}
                  />
                </div>
              </div>
            </>
          )}

          {/*==================== SUBMIT ====================*/}
          <div style={{ textAlign: "center" }}>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
