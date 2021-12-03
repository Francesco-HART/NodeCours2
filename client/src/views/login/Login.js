import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useLogin from "./useLogin";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

/**
 * View of Login
 * @returns {JSX.Element}
 * @constructor
 */
export default function Login() {
  const blocLogin = useLogin();
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <form component="form" onSubmit={blocLogin.submit} sx={{ mt: 1 }}>
          <TextField
            {...blocLogin.register("email")}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse Email"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={blocLogin.errors["email"]?.message}
            type={"string"}
            error={blocLogin.errors["email"] ? true : false}
          />

          <TextField
            {...blocLogin.register("password")}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot De Passe"
            id="password"
            autoComplete="password"
            type={blocLogin.isVisiblePassword ? "string" : "password"}
            helperText={blocLogin.errors["password"]?.message}
            error={blocLogin.errors["password"] ? true : false}
            InputProps={{
              endAdornment: (
                <IconButton
                  position="end"
                  onClick={blocLogin.toggleIsVisiblePassword}
                >
                  <VisibilityIcon />
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connexion
          </Button>
          <Grid item>
            <Link href="/register" variant="body2">
              {"S'enregistrer"}
            </Link>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
