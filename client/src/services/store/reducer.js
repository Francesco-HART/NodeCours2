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
        email: action.authUser?.email,
        type: action.authUser?.type,
        id: action.authUser?.id,
      };
    default:
      throw new Error();
  }
};
