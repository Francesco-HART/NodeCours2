import { initialAuthUser } from "./AuthProvider";
export const Logout = {
  type: "LOGOUT",
};

export const Login = {
  type: "LOGIN",
  authUser: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        ...initialAuthUser,
        fetching: false,
      };
    case "LOGIN":
      return {
        fetching: action.authUser.fetching,
        isLoggedIn: action.authUser.isLoggedIn,
        login: action.authUser?.login,
        type: action.authUser?.type,
        permissions: action.authUser?.permissions,
        id: action.authUser?.id,
      };
    default:
      throw new Error();
  }
};
