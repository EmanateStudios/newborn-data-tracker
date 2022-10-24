import { useState } from "react";
import { GET_USER_BY_EMAIL } from "../api/requests";
import { useLazyQuery } from "@apollo/client";

export function Login() {
  const [email, setEmail] = useState("");

  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER_BY_EMAIL, {
    onCompleted: (completedData) => {
      console.log(completedData.User.length);
      if (completedData.User.length === 0) {
        console.log("no data");
      } else {
        localStorage.setItem("id", completedData.User[0].id);
      }
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(email);
    getUser({
      variables: { email },
    });
  };

  return (
    <div className="contentContainer">
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
