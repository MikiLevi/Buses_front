import BusesPage from "./BusesPage";
import LinesPage from "./LinesPage";
import UsersPage from "./UsersPage";

export default function ManagerPage() {
  return (
    <div>
      <UsersPage />
      <LinesPage />
      <BusesPage />
    </div>
  );
}
