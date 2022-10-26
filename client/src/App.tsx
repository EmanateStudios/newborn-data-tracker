import { Route, Routes } from "react-router-dom";
import {
  Login,
  AddItem,
  ExportOptions,
  Records,
  EditItem,
  HomePage,
} from "./pages";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="screenContainer">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/EditItem" element={<EditItem />} />
        <Route path="/ExportOptions" element={<ExportOptions />} />
        <Route path="/Records" element={<Records />} />
        <Route path="/Login" element={<Login />} />
        {/* this home page forwarding to /AddItem was a solution for github not opening our desired page correctly */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
