import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import TeamPage from "../pages/TeamPage";
import DashboardPage from "../pages/DashboardPage";
import PlayerPage from "../pages/PlayerPage";



function MatchPage() {
  return (
    <div className="team-page">
      <div className="page-header">
        <div>
          <h1>Match Management</h1>
          <p>Match module will be created later.</p>
        </div>
      </div>
    </div>
  );
}

function LiveScoringPage() {
  return (
    <div className="team-page">
      <div className="page-header">
        <div>
          <h1>Live Scoring</h1>
          <p>Live scoring console will be created later.</p>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/teams" replace />} />

          <Route path="/admin/dashboard" element={<DashboardPage />} />

          <Route path="/admin/teams" element={<TeamPage />} />

          <Route path="/admin/players" element={<PlayerPage />} />

          <Route path="/admin/matches" element={<MatchPage />} />

          <Route path="/admin/scoring" element={<LiveScoringPage />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;