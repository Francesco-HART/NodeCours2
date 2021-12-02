import api from "./http";

export const UserService = {
  getUsers: () => api.get("/user"),
  updatePassword: (id, data) =>
    api.put("/user/password/" + id, {
      password: data.password,
      confirm_password: data.confirm_password,
    }),
  updateInfos: (id, data) => api.put("/user/" + id, data),
};
