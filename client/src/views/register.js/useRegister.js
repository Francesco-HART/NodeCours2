import { useForm } from "react-hook-form";
import { VariantType, useSnackbar } from "notistack";
import { useContext } from "react";
import { reducer } from "../../services/store/reducer";
import { AuthService } from "../../services/api/auth";
import { typesUser } from "../../services/store/actionTypes";
import { initialAuthUser } from "../../services/store/AuthProvider";
import { AuthContext } from "../../services/store/authContext";

const useRegister = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    AuthService.login(data)
      .then((res) => {
        authContext.setAuthUser(typesUser.LOGIN, res);
      })
      .catch((err) => {
        enqueueSnackbar(err);
      });
  };

  const submit = handleSubmit(onSubmit);

  return { submit, fields, register, errors };
};
export default useRegister;
