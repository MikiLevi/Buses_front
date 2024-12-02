import { useEffect, useState } from "react";
import { IUser } from "../interface/user";
import UseFetch from "../hook/UseFetch";

export default function UsersPage() {
  const { data, GET } = UseFetch("http://localhost:7979/users");
  const [users, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    GET();
  }, []);

  useEffect(() => {
    if (data) setUser(data);
    else console.log("Not found Users");
  }, [data]);

  return (
    <main>
      <div>
        <h1>All Users 👨‍🦱</h1>
        {users && users.length > 0 ? (
          users.map((user) => (
            <div key={user.email}>
              <b>Name: </b>
              {user.name}
              <p><b>Email: </b>{user.email}</p>
              <p>
                <b>Role: </b> {user.role}
              </p>
              <br />
            </div>
          ))
        ) : (
          <p>No user</p>
        )}
      </div>
    </main>
  );
}
