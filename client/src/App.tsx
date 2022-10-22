import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login, AddItem, ExportOptions, Records } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/AddItem" element={<AddItem />} />
      <Route path="/ExportOptions" element={<ExportOptions />} />
      <Route path="/Records" element={<Records />} />
    </Routes>
  );
}

export default App;
