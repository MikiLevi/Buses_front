import { useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import { AuthContext } from "../provider/AuthProvider";


export default function LoginPage() {
  const {user,login} = useContext(AuthContext) ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };
  

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    
    await  login!({ email, password });
    

  };
  return (
    <>
      <PageHeader titel="Login" subtitel="Welcome to the Login page" />

      <form
       onSubmit={handelSubmit}
      >
        <div>
          <label htmlFor="emeil">Email: </label>
          <input
            id="email"
            type="email"
            required
             value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your enail..."
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div>

      </div>
    </>
  );
}
