import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <NavLink to={"/manager"}>Manager</NavLink>
      <p />
      <NavLink to={"/"}>Home</NavLink>
      <p />
      <NavLink to={"/register"}>Register</NavLink>
      <p />
      <NavLink to={"/chat"}>Chat</NavLink>
      <p />
    </div>
  );
}
