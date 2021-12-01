import api from "./http";

export const AuthService = {
  getAuthUser: () =>
    api.get("/current").then((data) => {
      const authUser = {
        fetching: false,
        isLoggedIn: true,
        login: data.login,
        type: data.type,
        permissions: data.role?.permissions,
        group: data.group,
      };
      return authUser;
    }),
  login: (data) =>
    api.post("/login", {
      login: data.login,
      password: data.password,
    }),

  logout: (data) => api.get("/logout"),
};
