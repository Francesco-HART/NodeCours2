import { useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { typesUser } from "./actionTypes";
import { AuthContext } from "./authContext";
import { AuthService } from "../api/auth";

/**
 * Initialization of auth user
 * @type {{isLoggedIn: boolean, fetching: boolean, type: string, email: string}}
 */
export const initialAuthUser = {
  fetching: true,
  isLoggedIn: false,
  email: "",
  type: "",
};

/**
 * Get current user
 * @returns {{setAuthUser: () => void, authUser: S}}
 */
export function useProvideAuth() {
  const [authUser, setAuthUser] = useReducer(reducer, initialAuthUser);

  useEffect(() => {
    // Function call when start component
    async function getCurrentUser() {
      try {
        const currentAuthUser = await AuthService.getAuthUser();
        if (currentAuthUser)
          setAuthUser({
            type: "LOGIN",
            authUser: currentAuthUser,
          });
        else
          setAuthUser({
            type: typesUser.LOGOUT,
            authUser: {
              ...initialAuthUser,
              fetching: false,
            },
          });
      } catch (e) {
        setAuthUser({
          type: typesUser.LOGOUT,
          authUser: {
            ...initialAuthUser,
            fetching: false,
          },
        });
      }
    }

    getCurrentUser();
  }, []);

  return {
    authUser,
    setAuthUser,
  };
}

function AuthProvider({ children }) {
  try {
    const authValue = useProvideAuth();
    // TODO : improve the loading
    if (authValue.authUser.fetching) return null;

    return (
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    );
  } catch (err) {
    console.log("error reducer :", err.message);
    console.log(err);
    return <div></div>;
  }
}

export { AuthProvider };
