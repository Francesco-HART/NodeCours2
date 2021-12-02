import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { AuthService } from "../../services/api/auth";
import { typesUser } from "../../services/store/actionTypes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/store/authContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Champs manquant"),
  password: Yup.string().required("Champs manquant"),
});

const useLogin = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authContext = useContext(AuthContext);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const toggleIsVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const onSubmit = (data) => {
    AuthService.login(data)
      .then((res) => {
        authContext.setAuthUser(typesUser.LOGIN, res);
        if (authContext.authUser.isLoggedIn) {
          enqueueSnackbar("Bienvenue !", { variant: "success" });
          navigate("/");
        }
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
    schema,
    toggleIsVisiblePassword,
    isVisiblePassword,
  };
};
export default useLogin;