import { Route, Routes } from "react-router-dom";
import { Login, AddItem, ExportOptions, Records, EditItem } from "./pages";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="screenContainer">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/EditItem/:id" element={<EditItem />} />
        <Route path="/ExportOptions" element={<ExportOptions />} />
        <Route path="/Records" element={<Records />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
