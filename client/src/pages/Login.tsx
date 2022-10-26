import { useState, useEffect } from "react";
import { GET_USER_BY_EMAIL } from "../api/requests";
import { useLazyQuery } from "@apollo/client";
import { Modal } from "../components/Modal";

export function Login() {
  const [email, setEmail] = useState("");
  const [modalState, setModalState] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const [getUser] = useLazyQuery(GET_USER_BY_EMAIL, {
    onCompleted: (completedData) => {
      if (completedData.User.length === 0) {
        setMessage(
          "Sorry we cannot find an account with this email. Please check the spelling and try again"
        );
        setTitle("Error");
        setModalState(true);
      } else {
        localStorage.setItem("id", completedData.User[0].id);
        setMessage("Login successful. You can now add records to your account");
        setTitle("Success!");
        setModalState(true);
      }
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getUser({
      variables: { email },
    });
  };

  return (
    <div className="contentContainer">
      <Modal
        state={modalState}
        setState={setModalState}
        title={title}
        message={message}
      />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div
          className="checkBoxContainer"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            marginBottom: "10px",
          }}
        >
          <p style={{ margin: "0px 10px" }}>email</p>
          <input
            // ref={email}
            type="email"
            placeholder="me@gmail.com"
            name="supplementType"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // style={{ margin: "0px 10px", display: "flex", flexGrow: 1 }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
