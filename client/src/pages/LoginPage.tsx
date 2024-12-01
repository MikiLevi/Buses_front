import { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { AuthContext } from "../provider/AuthProvider";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   authContext!.clearError();
  //   await authContext!.login({ email, password }, currentURL!);
  // };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    authContext!.clearError();
  };


  return (
    <>
      <PageHeader title="Login" subtitle="Welcome to the Login page" />
      <form
        className="login-form"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Please enter an email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Please enter a password"
            required
          />
        </div>

        {authContext?.error && (
          <div className="error-message">{authContext?.error}</div>
        )}

        <button type="submit">Login</button>
      </form>
    </>
  );
}
