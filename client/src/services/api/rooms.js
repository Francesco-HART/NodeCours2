import api from "./http";

export const RoomService = {
  getAll: () =>
    api.get("/room").then((data) => {
      return data;
    }),

  getOneById: (id) =>
    api.get("/room/" + id).then((data) => {
      return data;
    }),
};
