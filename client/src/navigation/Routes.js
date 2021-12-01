import { AuthProvider } from "../services/store/AuthProvider";
import RequireAuth from "./RequireAuth";
import { Route, Routes } from "react-router-dom";
import Register from "../views/register.js/Register";
import Login from "../views/login/Login";
import Chat from "../views/chat/Chat";
import RequireAdmin from "./RequireAdmin";
function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={/*Page Login*/ <Chat />}></Route>
        <Route path="register" element={/*Page Login*/ <Register />}></Route>

        <Route
          path="/"
          element={<RequireAuth component={/*Page Dashboard*/ <Chat />} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default Router;
