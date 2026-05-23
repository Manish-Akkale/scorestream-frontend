import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { teamApi } from "../api/teamApi";
import "./TeamPage.css";

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    country: "",
    countryCode: "",
    logoUrl: "",
  });

  const [editingTeamId, setEditingTeamId] = useState(null);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await teamApi.getAllTeams();

      console.log("Teams response:", response);

      setTeams(response.data.content);
    } catch (error) {
      console.log("Team load error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateTeam = async (id) => {
    try {
      setLoading(true);
      setErrorMessage("");

      await teamApi.activateTeam(id);

      toast.success("Team activated successfully");

      await loadTeams();
    } catch (error) {
      console.log("Activate team error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateTeam = async (id) => {
    try {
      setLoading(true);
      setErrorMessage("");

      await teamApi.deactivateTeam(id);

      toast.success("Team deactivated successfully");

      await loadTeams();
    } catch (error) {
      console.log("Deactivate team error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      if (editingTeamId) {
        await teamApi.updateTeam(editingTeamId, formData);
        toast.success("Team updated successfully");
      } else {
        await teamApi.createTeam(formData);
        toast.success("Team created successfully");
      }

      setFormData({
        name: "",
        shortName: "",
        country: "",
        countryCode: "",
        logoUrl: "",
      });

      setEditingTeamId(null);

      await loadTeams();
    } catch (error) {
      console.log("Save team error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeam = async (team) => {
    setEditingTeamId(team.id);

    setFormData({
      name: team.name || "",
      shortName: team.shortName || "",
      country: team.country || "",
      countryCode: team.countryCode || "",
      logoUrl: team.logoUrl || "",
    });
  };

  const resetForm = () => {
    setEditingTeamId(null);

    setFormData({
      name: "",
      shortName: "",
      country: "",
      countryCode: "",
      logoUrl: "",
    });
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="team-page">
      <div className="page-header">
        <div>
          <h1>Team Management</h1>
          <p>Create, update and manage cricket teams.</p>
        </div>
      </div>

      <form className="team-form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>Team Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Royal Challengers Bengaluru"
            />
          </div>

          <div className="form-field">
            <label>Short Name</label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleInputChange}
              placeholder="RCB"
            />
          </div>

          <div className="form-field">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="India"
            />
          </div>

          <div className="form-field">
            <label>Country Code</label>
            <input
              type="text"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              placeholder="IND"
            />
          </div>

          <div className="form-field">
            <label>Logo URL</label>
            <input
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingTeamId
                ? "Update Team"
                : "Create Team"}
          </button>

          {editingTeamId && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <hr />

      {loading && <p>Loading teams...</p>}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {!loading && teams.length === 0 && <p>No teams found.</p>}
      <div className="table-card">
        <table className="team-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Team Name</th>
              <th>Short Name</th>
              <th>Country</th>
              <th>Country Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => (
              <tr>
                <td>{team.id}</td>
                <td>
                  {team.logoUrl ? (
                    <img
                      src={team.logoUrl}
                      alt={team.name}
                      width="40"
                      height="40"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #ddd",
                      }}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://placehold.co/80x80?text=Team";
                      }}
                    />
                  ) : (
                    <span>No Logo</span>
                  )}
                </td>
                <td>{team.name}</td>
                <td>{team.shortName}</td>
                <td>{team.country}</td>
                <td>{team.countryCode}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      backgroundColor: team.active ? "#dcfce7" : "#fee2e2",
                      color: team.active ? "#166534" : "#991b1b",
                    }}
                  >
                    {team.active ? "🟢 Active" : "🔴 Inactive"}
                  </span>
                </td>

                <td>
                  <button onClick={() => handleEditTeam(team)}>Edit</button>{" "}
                  {team.active ? (
                    <button onClick={() => handleDeactivateTeam(team.id)}>
                      Deactivate
                    </button>
                  ) : (
                    <button onClick={() => handleActivateTeam(team.id)}>
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamPage;
