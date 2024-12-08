import { useEffect, useState } from "react";
import { IUser } from "../interface/user";
import UseFetch from "../hook/UseFetch";
// import PaginationPage from "./PaginationPage";

export default function UsersPage() {
  const { data, GET } = UseFetch("http://localhost:7979/users");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    GET();
  }, []);

  const itemPage = 2;

  useEffect(() => {
    if (data) {
      setUser(data);
    } else {
      console.log("Not found Users");
    }
  }, [data]);

  const currentData = users.slice(
    (currentPage - 1) * itemPage,
    currentPage * itemPage
  );

  const totalPages = Math.ceil(users.length / itemPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };
  

  return (
    <main>
      <div>
        <h1>All Users 👨‍🦱</h1>
        {currentData.map((user) => (
          <div key={user.email}>
            <p>
              <b>Name: </b>
              {user.name}
            </p>
            <p>
              <b>Email: </b>
              {user.email}
            </p>
            <p>
              <b>Role: </b>
              {user.role}
            </p>
            <br />
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleBack} disabled={currentPage <= 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
