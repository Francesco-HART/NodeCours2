import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CardActionArea,
} from "@mui/material";
import useRegister from "./useRegister";

const Register = () => {
  const blocRegister = useRegister();

  return (
    <Grid container justifyContent="center" alignItems="center">
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
                    <Grid item key={index}>
                      <TextField
                        {...blocRegister.register(elem.name)}
                        label={elem.label}
                        //   helperText={blocRegister.errors[elem.name]?.message}
                        //   error={blocRegister.errors[elem.name] ? true : false}
                        //   //   InputProps={{
                        //   //     endAdornment: (
                        //   //       <InputAdornment position="start">
                        //   //         <AccountBoxIcon></AccountBoxIcon>
                        //   //       </InputAdornment>
                        //   //     ),
                        //   //   }}
                      />
                    </Grid>
                  );
                })}
                <Grid item>
                  <TextField
                    {...blocRegister.register("password")}
                    label={"Password"}
                    //   helperText={blocRegister.errors[elem.name]?.message}
                    //   error={blocRegister.errors[elem.name] ? true : false}
                    //   //   InputProps={{
                    //   //     endAdornment: (
                    //   //       <InputAdornment position="start">
                    //   //         <AccountBoxIcon></AccountBoxIcon>
                    //   //       </InputAdornment>
                    //   //     ),
                    //   //   }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    {...blocRegister.register("password")}
                    label={"Mot de passe"}
                    //   helperText={blocRegister.errors[elem.name]?.message}
                    //   error={blocRegister.errors[elem.name] ? true : false}
                    //   //   InputProps={{
                    //   //     endAdornment: (
                    //   //       <InputAdornment position="start">
                    //   //         <AccountBoxIcon></AccountBoxIcon>
                    //   //       </InputAdornment>
                    //   //     ),
                    //   //   }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    {...blocRegister.register("confirm_password")}
                    label={"Confimer le mot de passe"}
                    //   helperText={blocRegister.errors[elem.name]?.message}
                    //   error={blocRegister.errors[elem.name] ? true : false}
                    //   //   InputProps={{
                    //   //     endAdornment: (
                    //   //       <InputAdornment position="start">
                    //   //         <AccountBoxIcon></AccountBoxIcon>
                    //   //       </InputAdornment>
                    //   //     ),
                    //   //   }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActionArea>
              <Button type="submit">Valider</Button>
            </CardActionArea>
          </Card>
        </Grid>
      </form>
    </Grid>
  );
};
export default Register;
