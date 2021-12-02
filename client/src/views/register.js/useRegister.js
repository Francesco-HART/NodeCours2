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
  name: Yup.string(),
  email: Yup.string().email().required("Champs manquant"),
  password: Yup.string().required("Champs manquant"),
  confirm_password: Yup.string()
    .when("password", (password, field) =>
      password ? field.required().oneOf([Yup.ref("password")]) : field
    )
    .required("Champs manquant"),
});

const useRegister = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authContext = useContext(AuthContext);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassWord, setIsVisibleConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "string",
    },
    {
      name: "name",
      label: "Nom",
      type: "string",
    },
  ];

  const toggleIsVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const toggleIsVisibleConfirmPassword = () => {
    setIsVisibleConfirmPassword(!isVisibleConfirmPassWord);
  };

  const onSubmit = (data) => {
    AuthService.register(data)
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
    fields,
    register,
    errors,
    schema,
    toggleIsVisiblePassword,
    toggleIsVisibleConfirmPassword,
    isVisibleConfirmPassWord,
    isVisiblePassword,
  };
};
export default useRegister;
