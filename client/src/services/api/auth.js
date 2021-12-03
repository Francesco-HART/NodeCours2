import api from "./http";

/**
 * This page fetch all the infos of auth action
 * @type {{getAuthUser: (function(): Promise<{name, isLoggedIn: boolean, fetching: boolean, id: *, type, email}>), logout: (function(*): Promise<*>), login: (function(*): Promise<*>), register: (function(*): Promise<*>)}}
 */
export const AuthService = {
  getAuthUser: () =>
    api.get("/currentuser").then((data) => {
      const authUser = {
        fetching: false,
        isLoggedIn: true,
        email: data.email,
        type: data.type,
        name: data.name,
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
      password: data.password,
      confirm_password: data.confirm_password,
    }),

  logout: (data) => api.get("/logout"),
};
