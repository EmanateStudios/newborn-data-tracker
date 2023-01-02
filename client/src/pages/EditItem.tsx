import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  GET_USER_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD,
} from "../api/requests";
import { record } from "../api/types";
import { DateTime } from "luxon";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
// --- ICONS ---
import { FiCalendar, FiWatch } from "react-icons/fi";
import { FaPoo } from "react-icons/fa";
import { BsFillDropletFill, BsHourglassSplit } from "react-icons/bs";
import { GiVomiting, GiChemicalTank } from "react-icons/gi";
import { IoIosBeaker, IoIosTimer } from "react-icons/io";
// --- loader
import loader from "../imgs/loader.gif";

export function EditItem() {
  const navigate = useNavigate();
  // record id passed from params for edits and deletes
  const location = useLocation();

  const {
    id,
    date,
    time,
    leftBreast,
    rightBreast,
    vomit_spitUp,
    pumpTime,
    supplementQuantity,
    supplementType,
    user_id,
    bowelMovement,
  } = location.state as record;

  const datify = DateTime.fromFormat(`${date}`, "yyyy-MM-dd");

  const initialValues: record = {
    date: datify.toFormat("yyyy-MM-dd"),
    time,
    leftBreast: leftBreast || "",
    rightBreast: rightBreast || "",
    void: location.state.void,
    vomit_spitUp,
    pumpTime: pumpTime || "",
    supplementQuantity: supplementQuantity || "",
    supplementType: supplementType || "",
    user_id,
    bowelMovement,
  };

  const [editRecord, { loading, data, error }] = useMutation(UPDATE_RECORD, {
    onCompleted: () => {
      console.log(`SUCCESSFUL RECORD UPDATE`);
      setModalMessage("successfully updated record");
      setTitle("Success");
      setEditModal(true);
    },
  });

  const [deleteRecord] = useMutation(DELETE_RECORD, {
    onCompleted: () => {
      console.log(`SUCCESSFUL RECORD DELETION`);
      setModalMessage("successfully deleted record");
      setTitle("Success");
      setEditModal(true);
    },
  });

  const handleEdit = (event: any) => {
    event.preventDefault();
    if (user_id) {
      editRecord({
        variables: {
          id,
          _set: {
            date: record.date,
            time: record.time.toLocaleString(DateTime.TIME_SIMPLE),
            leftBreast: record.leftBreast || 0,
            rightBreast: record.rightBreast || 0,
            void: record.void || false,
            vomit_spitUp: record.vomit_spitUp || false,
            pumpTime: record.pumpTime || 0,
            supplementQuantity: record.supplementQuantity || 0,
            supplementType: record.supplementType || "",
            user_id: user_id,
            bowelMovement: record.bowelMovement || false,
          },
        },
        update(cache, { data }) {
          const { Record }: any = cache.readQuery({
            query: GET_USER_RECORDS,
            variables: {
              id: user_id,
            },
          });

          cache.writeQuery({
            query: GET_USER_RECORDS,
            data: {
              Record: Record.map((item: any) => {
                if (item.id === data.update_Record_by_pk.id) {
                  return data.update_Record_by_pk;
                } else {
                  return item;
                }
              }),
            },
            variables: {
              id: user_id,
            },
          });
        },
      });
    } else {
      console.log("cannot find id");
    }
  };

  const handleDelete = (event: any) => {
    event.preventDefault();
    setModalMessage(
      "Once deleted this record is permanently lost. Are you sure you want to continue?"
    );
    setTitle("Warning");
    setDeleteModal(true);
  };

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [record, setRecord] = useState<record>(initialValues);
  const [modalMessage, setModalMessage] = useState("");
  const [title, setTitle] = useState("");

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
      {/* MODAL THAT GOES BACK TO RECORDS */}
      <Modal
        state={editModal}
        setState={setEditModal}
        action={() => navigate("/Records")}
        title={title}
        message={modalMessage}
        leftButtonText={"Continue Editing"}
        rightButtonText={"Continue to Records"}
      />
      {/* MODAL THAT DELETES THIS RECORD */}
      <Modal
        state={deleteModal}
        setState={setDeleteModal}
        action={() => {
          deleteRecord({
            variables: {
              id,
            },
            update(cache, { data }) {
              const { Record }: any = cache.readQuery({
                query: GET_USER_RECORDS,
                variables: {
                  id: user_id,
                },
              });

              cache.writeQuery({
                query: GET_USER_RECORDS,
                data: {
                  Record: Record.filter(
                    (item: any) => item.id !== data.delete_Record_by_pk.id
                  ),
                },
                variables: {
                  id: user_id,
                },
              });
            },
          });
        }}
        title={title}
        message={modalMessage}
      />
      <div className="contentContainer">
        <h1>Edit Record</h1>
        <form>
          {loading ? (
            <img
              src={loader}
              alt="Loading..."
              style={{
                width: "90vw",
                alignSelf: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          ) : (
            <>
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
                      value={`${time}`}
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
                      name="leftBreast"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="ie. 15"
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
                  <p style={{ margin: "0px 10px" }}>Qty (oz)</p>
                  <IoIosBeaker size={"20px"} color={"rgb(3, 144, 252)"} />
                  <input
                    type="input"
                    placeholder="quantity in oz (optional)"
                    name="supplementQuantity"
                    inputMode="decimal"
                    // pattern="[0-9]*"
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
              {/*==================== SUBMIT ====================*/}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={handleDelete}
                  style={{ backgroundColor: "rgb(179, 43, 43" }}
                >
                  Delete
                </button>
                <button onClick={handleEdit}>Submit</button>
              </div>
            </>
          )}


        </form>
      </div>
    </>
  );
}
