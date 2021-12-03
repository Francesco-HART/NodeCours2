import { AuthProvider } from "../services/store/AuthProvider";
import RequireAuth from "./RequireAuth";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../views/register.js/Register";
import Login from "../views/login/Login";
import Chat from "../views/chat/Chat";
import RequireAdmin from "./RequireAdmin";
import Users from "../views/user/Users";
import UpdateOneUser from "../views/user/UpdateUser";
import RequireNoAuth from "./RequireNoAuth";
function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<RequireNoAuth component={/*Page Dashboard*/ <Login />} />}
        />
        <Route
          path="/register"
          element={
            <RequireNoAuth component={/*Page Dashboard*/ <Register />} />
          }
        />
        <Route
          path="/"
          element={<RequireAuth component={/*Page Dashboard*/ <Chat />} />}
        />
        <Route component={<Navigate to="/" />} />

        <Route
          path="/room/:id"
          element={<RequireAuth component={/*Page Dashboard*/ <Chat />} />}
        />
        <Route
          path="/users"
          element={<RequireAdmin component={/*Page Dashboard*/ <Users />} />}
        />

        {
          //<Route
          //path="/user/:id"
          //element={<RequireAdmin component={/*Page Dashboard*/ <UpdateOneUser />} />}
          ///>
        }

        <Route path="/user/:id" element={<UpdateOneUser />} />
      </Routes>
    </AuthProvider>
  );
}

export default Router;
