import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import TeamPage from "../pages/TeamPage";

function DashboardPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to ScoreStream admin panel.</p>
    </div>
  );
}

function PlayerPage() {
  return (
    <div>
      <h1>Player Management</h1>
      <p>Player module will be created next.</p>
    </div>
  );
}

function MatchPage() {
  return (
    <div>
      <h1>Match Management</h1>
      <p>Match module will be created later.</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/teams" />} />

          <Route path="/admin/dashboard" element={<DashboardPage />} />

          <Route path="/admin/teams" element={<TeamPage />} />

          <Route path="/admin/players" element={<PlayerPage />} />

          <Route path="/admin/matches" element={<MatchPage />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;