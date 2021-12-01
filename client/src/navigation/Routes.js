import { AuthProvider } from "../services/store/AuthProvider";
import RequireAuth from "./RequireAuth";
import { Route, Routes } from "react-router-dom";
import Register from "../views/register.js/Register";

function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={/*Page Login*/ <Register />}></Route>
        <Route path="register" element={/*Page Login*/ <Register />}></Route>

        <Route
          path="/"
          element={
            <RequireAuth component={/*Page Dashboard*/ <div>grgeg</div>} />
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default Router;
