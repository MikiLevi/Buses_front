import { Route, Routes } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import LoginPage from "../pages/LoginPage";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}
