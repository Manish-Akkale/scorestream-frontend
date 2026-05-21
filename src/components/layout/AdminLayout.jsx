import { Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>ScoreStream</h2>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/teams">Teams</Link>
          <Link to="/admin/players">Players</Link>
          <Link to="/admin/matches">Matches</Link>
          <Link to="/admin/scoring">Live Scoring</Link>
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}

export default AdminLayout;