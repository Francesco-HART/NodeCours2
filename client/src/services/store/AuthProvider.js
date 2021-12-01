import { useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { typesUser } from "./actionTypes";
import { AuthContext } from "./authContext";
import { AuthService } from "../api/auth";

export const initialAuthUser = {
  fetching: true,
  isLoggedIn: false,
  email: "",
  type: "",
};

export function useProvideAuth() {
  const [authUser, setAuthUser] = useReducer(reducer, initialAuthUser);

  useEffect(() => {
    // Function call when start component
    async function getCurrentUser() {
      try {
        const currentAuthUser = await AuthService.getAuthUser();
        console.log(currentAuthUser);
        if (currentAuthUser)
          setAuthUser({
            type: typesUser.LOGIN,
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
  const authValue = useProvideAuth();

  // TODO : improve the loading
  if (authValue.authUser.fetching) return null;

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider };
