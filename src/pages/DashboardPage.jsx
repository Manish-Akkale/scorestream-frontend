import { useEffect, useState } from "react";
import { teamApi } from "../api/teamApi";
import "./DashboardPage.css";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const response = await teamApi.getAllTeams({
        page: 0,
        size: 100,
        sort: "name,asc",
      });

      setTeams(response.data.content);
    } catch (error) {
      console.log("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalTeams = teams.length;
  const activeTeams = teams.filter((team) => team.active).length;
  const inactiveTeams = teams.filter((team) => !team.active).length;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of ScoreStream cricket management system.</p>
        </div>
      </div>

      {loading && <p>Loading dashboard...</p>}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Teams</h3>
          <p>{totalTeams}</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Teams</h3>
          <p>{activeTeams}</p>
        </div>

        <div className="dashboard-card">
          <h3>Inactive Teams</h3>
          <p>{inactiveTeams}</p>
        </div>
      </div>

      <div className="quick-actions-card">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <Link href="/admin/teams">Manage Teams</Link>
          <Link href="/admin/players">Manage Players</Link>
          <Link href="/admin/matches">Manage Matches</Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;