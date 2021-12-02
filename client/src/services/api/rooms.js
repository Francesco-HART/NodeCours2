import api from "./http";

export const RoomService = {
  getAll: () =>
    api.get("/rooms").then((data) => {
      return data;
    }),

  getOneById: (id) =>
    api.get("/room/" + id).then((data) => {
      return data;
    }),

  getDefault: () =>
    api.get("/default-room").then((data) => {
      return data;
    }),

  addMessage: (_roomId, message) =>
    api
      .post("/message", {
        _roomId,
        message,
      })
      .then((data) => {
        return data;
      }),
};
