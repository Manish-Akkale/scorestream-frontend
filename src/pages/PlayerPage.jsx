import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { playerApi } from "../api/playerApi";
import { teamApi } from "../api/teamApi";
import {
  BATTING_STYLES,
  BOWLING_STYLES,
  PLAYER_ROLES,
} from "../constants/playerOptions";
import "./PlayerPage.css";

const initialPlayerFormData = {
  teamId: "",
  teamName: "",
  name: "",
  shortName: "",
  displayName: "",
  role: "",
  battingStyle: "",
  bowlingStyle: "",
  jerseyNumber: "",
  country: "",
  countryCode: "",
  dateOfBirth: "",
  profileImageUrl: "",
};

function PlayerPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teams, setTeams] = useState([]);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  const [formData, setFormData] = useState(initialPlayerFormData);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await playerApi.getAllPlayers();

      console.log("Players response:", response);

      setPlayers(response.data.content);
    } catch (error) {
      console.log("Player load error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      const response = await teamApi.getAllTeams({
        page: 0,
        size: 100,
        sort: "name,asc",
      });

      setTeams(response.data.content);
    } catch (error) {
      console.log("Team load error:", error);
    }
  };

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (fieldName === "countryCode") {
      fieldValue = fieldValue.toUpperCase();
    }

    if (fieldName === "teamId") {
      const selectedTeam = teams.find(
        (team) => String(team.id) === String(fieldValue),
      );

      setFormData({
        ...formData,
        teamId: fieldValue,
        teamName: selectedTeam ? selectedTeam.name : "",
      });

      return;
    }

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

      const payload = {
        ...formData,
        teamId: Number(formData.teamId),
        jerseyNumber: formData.jerseyNumber
          ? Number(formData.jerseyNumber)
          : null,
        dateOfBirth: formData.dateOfBirth || null,
      };

      if (editingPlayerId) {
        await playerApi.updatePlayer(editingPlayerId, payload);
        toast.success("Player updated successfully");
      } else {
        await playerApi.createPlayer(payload);
        toast.success("Player created successfully");
      }

      resetForm();

      await loadPlayers();
    } catch (error) {
      console.log("Save player error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleActivatePlayer = async (id) => {
    try {
      setLoading(true);
      setErrorMessage("");

      await playerApi.activatePlayer(id);

      toast.success("Player activated successfully");

      await loadPlayers();
    } catch (error) {
      console.log("Activate Player error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivatePlayer = async (id) => {
    try {
      setLoading(true);
      setErrorMessage("");

      await playerApi.deactivatePlayer(id);

      toast.success("Player deactivated successfully");

      await loadPlayers();
    } catch (error) {
      console.log("Deactivate player error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlayer = async (player) => {
    setEditingPlayerId(player.id);
    setFormData({
      teamId: player.teamId || "",
      teamName: player.teamName || "",
      name: player.name || "",
      shortName: player.shortName || "",
      displayName: player.displayName || "",
      role: player.role || "",
      battingStyle: player.battingStyle || "",
      bowlingStyle: player.bowlingStyle || "",
      jerseyNumber: player.jerseyNumber || "",
      country: player.country || "",
      countryCode: player.countryCode || "",
      dateOfBirth: player.dateOfBirth || "",
      profileImageUrl: player.profileImageUrl || "",
    });
  };

  const resetForm = () => {
    setEditingPlayerId(null);
    setFormData(initialPlayerFormData);
  };

  useEffect(() => {
    loadPlayers();
    loadTeams();
  }, []);

  return (
    <div className="player-page">
      <div className="page-header">
        <div>
          <h1>Player Management</h1>
          <p>Create, update and manage cricket players.</p>
        </div>
      </div>

      <form className="player-form-card" onSubmit={handleSubmit}>
        <div className="player-form-grid">
          <div className="form-field">
            <label>Team</label>
            <select
              name="teamId"
              value={formData.teamId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Team</option>

              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.shortName})
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Player Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Virat Kohli"
              required
            />
          </div>

          <div className="form-field">
            <label>Short Name</label>
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleInputChange}
              placeholder="Kohli"
            />
          </div>

          <div className="form-field">
            <label>Display Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="Virat Kohli"
            />
          </div>

          <div className="form-field">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              {PLAYER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Batting Style</label>
            <select
              name="battingStyle"
              value={formData.battingStyle}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Batting Style</option>
              {BATTING_STYLES.map((battingStyle) => (
                <option value={battingStyle} key={battingStyle}>
                  {battingStyle}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Bowling Style</label>
            <select
              name="bowlingStyle"
              value={formData.bowlingStyle}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Bowling Style</option>
              {BOWLING_STYLES.map((bowlingStyle) => (
                <option value={bowlingStyle} key={bowlingStyle}>
                  {bowlingStyle}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Jersey Number</label>
            <input
              type="number"
              name="jerseyNumber"
              value={formData.jerseyNumber}
              onChange={handleInputChange}
              placeholder="18"
              min="0"
              max="999"
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
              maxLength={3}
            />
          </div>

          <div className="form-field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label>Profile Image URL</label>
            <input
              type="text"
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleInputChange}
              placeholder="https://placehold.co/80x80?text=VK"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingPlayerId
                ? "Update Player"
                : "Create Player"}
          </button>

          {editingPlayerId && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {loading && <p>Loading players...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!loading && players.length === 0 && <p>No players found.</p>}

      <div className="table-card">
        <table className="player-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Player Name</th>
              <th>Team</th>
              <th>Role</th>
              <th>Batting</th>
              <th>Bowling</th>
              <th>Jersey</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>

                <td>
                  {player.profileImageUrl ? (
                    <img
                      src={player.profileImageUrl}
                      alt={player.name}
                      width="40"
                      height="40"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://placehold.co/80x80?text=P";
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td>{player.name}</td>
                <td>{player.teamName}</td>
                <td>{player.role}</td>
                <td>{player.battingStyle}</td>
                <td>{player.bowlingStyle}</td>
                <td>{player.jerseyNumber}</td>

                <td>
                  <span
                    className={
                      player.active
                        ? "status-badge active"
                        : "status-badge inactive"
                    }
                  >
                    {player.active ? "🟢 Active" : "🔴 Inactive"}
                  </span>
                </td>

                <td>
                  {" "}
                  <button onClick={() => handleEditPlayer(player)}>
                    Edit
                  </button>{" "}
                  {player.active ? (
                    <button onClick={() => handleDeactivatePlayer(player.id)}>
                      Deactivate
                    </button>
                  ) : (
                    <button onClick={() => handleActivatePlayer(player.id)}>
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

export default PlayerPage;
