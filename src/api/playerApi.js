import axiosClient from "./axiosClient";

export const playerApi = {
  createPlayer: (data) => {
    return axiosClient.post("/players", data);
  },

  getAllPlayers: (params = {}) => {
    return axiosClient.get("/players", {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 20,
        sort: params.sort ?? "name,asc",
      },
    });
  },

  getPlayerById: (id) => {
    return axiosClient.get(`/players/${id}`);
  },

  getPlayersByTeam: (teamId, params = {}) => {
    return axiosClient.get(`/players/team/${teamId}`, {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 20,
        sort: params.sort ?? "name,asc",
      },
    });
  },

  updatePlayer: (id, data) => {
    return axiosClient.put(`/players/${id}`, data);
  },

  activatePlayer: (id) => {
    return axiosClient.patch(`/players/${id}/activate`);
  },

  deactivatePlayer: (id) => {
    return axiosClient.patch(`/players/${id}/deactivate`);
  },
};