import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import useUpdateOneUser from "./useUpdateOneUser";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UpdateOneUser = () => {
  const blocUpdateUsers = useUpdateOneUser();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardContent>iciii</CardContent>
            </Card>
          </Grid>
          <Grid itemitem xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      {...blocUpdateUsers.register("password")}
                      label={"Mot de passe"}
                      type={
                        blocUpdateUsers.isVisiblePassword
                          ? "string"
                          : "password"
                      }
                      helperText={blocUpdateUsers.errors["password"]?.message}
                      error={blocUpdateUsers.errors["password"] ? true : false}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            position="end"
                            onClick={blocUpdateUsers.toggleIsVisiblePassword}
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
                      {...blocUpdateUsers.register("confirm_password")}
                      label={"Confimer le mot de passe"}
                      helperText={
                        blocUpdateUsers.errors["confirm_password"]?.message
                      }
                      type={
                        blocUpdateUsers.isVisibleConfirmPassWord
                          ? "string"
                          : "password"
                      }
                      error={
                        blocUpdateUsers.errors["confirm_password"]
                          ? true
                          : false
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            position="end"
                            onClick={
                              blocUpdateUsers.toggleIsVisibleConfirmPassword
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
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default UpdateOneUser;
