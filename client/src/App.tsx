// import React from 'react';
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <label>
          email:
          <input type="text" name="email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
