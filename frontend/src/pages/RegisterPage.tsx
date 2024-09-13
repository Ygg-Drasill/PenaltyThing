import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasePage from "./BasePage";
import { useUserServiceRegisterUser } from "../components/openapi/queries";
import { useState } from "react";
import { AnnouncementSharp } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { cookies } from "../App";

export default function RegisterPage() {
  const registerUserMutation = useUserServiceRegisterUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate()

  const registerSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (password != passwordConfirm) {
      console.log("Passwords does not match");
      return;
    }

    registerUserMutation.mutate({
      request: {
        name: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
    }, {
        onSuccess: (data) => {
            cookies.set("userId", data.id, {
              path: "app/"
            })
            navigate("/app/home")
        },
        onError: (data) => {
            console.log(data);
        }
    });
  };

  return (
    <BasePage loading={registerUserMutation.isPending}>
      <Typography color={"primary"} variant="h5" mb={2}>
        Register
      </Typography>
      <Card>
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={registerSubmissionHandler}
          >
            <Stack gap={4}>
              <Stack direction="row" justifyContent="space-between" gap={4}>
                <TextField
                  fullWidth
                  id="firstname"
                  label="First name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></TextField>
                <TextField
                  fullWidth
                  id="lastname"
                  label="Last name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></TextField>
              </Stack>
              <TextField
                required
                id="name"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              ></TextField>
              <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
              <TextField
                required
                id="password-confirm"
                label="Confirm password"
                variant="outlined"
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              ></TextField>
              <Stack direction={"row"} justifyContent={"center"} gap={2}>
                <Button type="submit" color="success" variant="outlined">
                  Register
                </Button>
                <Box alignItems={"flex-start"}>
                  <Typography
                    textAlign={"left"}
                    variant="subtitle1"
                    sx={{ color: "background.default" }}
                  >
                    <AnnouncementSharp
                      sx={{ marginRight: 1, color: "warning.light" }}
                    />
                    Warning: This site is still under development, we do not
                    guarantee security.
                  </Typography>
                  <Typography
                    textAlign={"left"}
                    variant="subtitle2"
                    sx={{ color: "background.default" }}
                  >
                    Please do not use your real password, we recommend
                    generating one using your password manager.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            Already have an account?{" "}
            <Link color={"info.main"} component={RouterLink} to={"/login"}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </BasePage>
  );
}
