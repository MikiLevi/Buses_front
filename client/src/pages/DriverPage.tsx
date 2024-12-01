import React, { useEffect, useState } from "react";
import UseFetch from "../hook/UseFetch";
import { IUser } from "../interface/UserType";

export default function DriverPage() {
  const { data, GET } = UseFetch("http://localhost:5555/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setUsers(data);
    else console.log("No babysitters found");
  }, [data]);

  return (
    <>
      <main>
        <div className="card-list">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div key={user.email} className="user-card">
                <h2>{user.name}</h2>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            ))
          ) : (
            <p>No babysitters available.</p>
          )}
        </div>
      </main>
    </>
  );
}
