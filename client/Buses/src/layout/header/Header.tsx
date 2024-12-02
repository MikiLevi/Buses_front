import { Link, NavLink } from "react-router-dom";
import UsersPage from "../../pages/UsersPage";

export default function Header() {
  return (
    <div>
      <NavLink to={"/manager"}>Manager</NavLink>
      <p />
      <NavLink to={"/"}> Home</NavLink>
    </div>
  );
}
