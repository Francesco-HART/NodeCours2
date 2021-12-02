import api from "./http";

export const AuthService = {
  getAuthUser: () =>
    api.get("/currentuser").then((data) => {
      const authUser = {
        fetching: false,
        isLoggedIn: true,
        email: data.email,
        type: data.type,
        id: data._id,
      };
      return authUser;
    }),

  login: (data) =>
    api.post("/login", {
      email: data.email,
      password: data.password,
    }),

  register: (data) =>
    api.post("/register", {
      email: data.email,
      name: data.name,
      password: data.password,
    }),

  logout: (data) => api.get("/logout"),
};
