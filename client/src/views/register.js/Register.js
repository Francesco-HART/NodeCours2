import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CssBaseline,
  Box,
} from "@mui/material";
import useRegister from "./useRegister";
import VisibilityIcon from "@mui/icons-material/Visibility";

/**
 * View of Register
 * @returns {JSX.Element}
 * @constructor
 */
const Register = () => {
  const blocRegister = useRegister();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={blocRegister.submit}>
          <Grid item>
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  {blocRegister.fields.map((elem, index) => {
                    return (
                      <Grid item key={index} xs={8}>
                        <TextField
                          fullWidth
                          required
                          {...blocRegister.register(elem.name)}
                          label={elem.label}
                          type={elem.type}
                          helperText={blocRegister.errors[elem.name]?.message}
                          error={blocRegister.errors[elem.name] ? true : false}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    );
                  })}
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      required
                      {...blocRegister.register("password")}
                      label={"Mot de passe"}
                      type={
                        blocRegister.isVisiblePassword ? "string" : "password"
                      }
                      helperText={blocRegister.errors["password"]?.message}
                      error={blocRegister.errors["password"] ? true : false}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            position="end"
                            onClick={blocRegister.toggleIsVisiblePassword}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      required
                      {...blocRegister.register("confirm_password")}
                      label={"Confimer le mot de passe"}
                      helperText={
                        blocRegister.errors["confirm_password"]?.message
                      }
                      type={
                        blocRegister.isVisibleConfirmPassWord
                          ? "string"
                          : "password"
                      }
                      error={
                        blocRegister.errors["confirm_password"] ? true : false
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            position="end"
                            onClick={
                              blocRegister.toggleIsVisibleConfirmPassword
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Button type="submit">Valider</Button>
            </Card>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};
export default Register;
