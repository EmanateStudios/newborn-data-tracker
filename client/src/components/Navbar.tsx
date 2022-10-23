import { NavLink } from "react-router-dom";
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
                  size={"1.5rem"}
                  color={isActive ? "rgba(19, 14, 46, 1.0)" : "silver"}
                />
              );
            }}
          </NavLink>
        </li>
        <li>
          <NavLink to="AddItem">
            {({ isActive }) => {
              return (
                <TfiPlus
                  size={"1.5rem"}
                  color={isActive ? "rgba(19, 14, 46, 1.0)" : "silver"}
                />
              );
            }}
          </NavLink>
        </li>
        <li>
          <NavLink to="ExportOptions">
            {({ isActive }) => {
              return (
                <TfiExport
                  size={"1.5rem"}
                  color={isActive ? "rgba(19, 14, 46, 1.0)" : "silver"}
                />
              );
            }}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
