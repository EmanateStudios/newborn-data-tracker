import { NavLink } from "react-router-dom";
import "../pages/pagestyles/pagestyles.css";
import { TfiPlus, TfiExport, TfiRulerPencil } from "react-icons/tfi";

export function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="Records">
            {({ isActive }) => {
              return (
                <TfiRulerPencil
                  size={"3rem"}
                  color={isActive ? "black" : "silver"}
                />
              );
            }}
          </NavLink>
        </li>
        <li>
          <NavLink to="AddItem">
            {({ isActive }) => {
              return (
                <TfiPlus size={"3rem"} color={isActive ? "black" : "silver"} />
              );
            }}
          </NavLink>
        </li>
        <li>
          <NavLink to="ExportOptions">
            {({ isActive }) => {
              return (
                <TfiExport
                  size={"3rem"}
                  color={isActive ? "black" : "silver"}
                />
              );
            }}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
