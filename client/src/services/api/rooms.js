import api from "./http";

/**
 * This page contains all the service of rooms
 * @type {{getAll: (function(): Promise<unknown>), getOneById: (function(*): Promise<unknown>), getDefault: (function(): Promise<unknown>), addMessage: (function(*, *): Promise<unknown>)}}
 */
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
