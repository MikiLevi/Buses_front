import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ManagerPage from "../pages/ManagerPage";
import RegisterPage from "../pages/RegisterPage";
import SocketIo from "../components/SocketIo";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<SocketIo />} />
      </Routes>
    </div>
  );
}
