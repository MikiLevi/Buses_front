import React, { useState } from "react";
import UseFetch from "../hook/UseFetch";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { POST } = UseFetch("http://localhost:7979/users");

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { name, email, password, role };
    POST(newUser);
  };
  return (
    <>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role">Role: </label>
          <select
            id="role"
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
            <option value="passenger">Passenger</option>
          </select>
        </div>
        <br />
        <button type="submit">Register🤞</button>
      </form>
    </>
  );
}
