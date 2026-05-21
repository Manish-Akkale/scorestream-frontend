import { NavLink } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>ScoreStream</h2>

        <nav>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/teams">Teams</NavLink>
          <NavLink to="/admin/players">Players</NavLink>
          <NavLink to="/admin/matches">Matches</NavLink>
          <NavLink to="/admin/scoring">Live Scoring</NavLink>
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}

export default AdminLayout;