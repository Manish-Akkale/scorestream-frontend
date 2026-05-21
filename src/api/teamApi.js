import axiosClient from "./axiosClient";

export const teamApi = {
  createTeam: (data) => {
    return axiosClient.post("/teams", data);
  },

  getAllTeams: (params = {}) => {
    return axiosClient.get("/teams", {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 20,
        sort: params.sort ?? "name,asc",
      },
    });
  },

  getTeamById: (id) => {
    return axiosClient.get(`/teams/${id}`);
  },

  updateTeam: (id, data) => {
    return axiosClient.put(`/teams/${id}`, data);
  },

  activateTeam: (id) => {
    return axiosClient.patch(`/teams/${id}/activate`);
  },

  deactivateTeam: (id) => {
    return axiosClient.patch(`/teams/${id}/deactivate`);
  },
};
