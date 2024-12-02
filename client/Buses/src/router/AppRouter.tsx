import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ManagerPage from "../pages/ManagerPage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </div>
  );
}
