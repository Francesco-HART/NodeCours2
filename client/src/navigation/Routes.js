import { AuthProvider } from "../services/store/AuthProvider";
import RequireAuth from "./RequireAuth";
import { Route, Routes } from "react-router-dom";

function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={/*Page Login*/ <div>fgrgrg</div>}></Route>
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
