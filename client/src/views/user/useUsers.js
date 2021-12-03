import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserService } from "../../services/api/user";

/**
 * view of use users
 * @returns {{navigateToHome: navigateToHome, navigateToUpdateOneUser: navigateToUpdateOneUser, users: [{name: string, id: string, type: string, email: string}]}}
 */
const useUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { email: "tom@tom.com", name: "Tom", id: "1", type: "user" },
  ]);

  const navigateToUpdateOneUser = (id) => {
    navigate("/user/" + id);
  };
  const navigateToHome = () => {
    navigate("/");
  };
  useEffect(() => {
    async function getUsers() {
      const allUsers = await UserService.getUsers();
      setUsers(allUsers);
    }
    getUsers();
  }, []);

  return { users, navigateToUpdateOneUser, navigateToHome };
};

export default useUsers;
