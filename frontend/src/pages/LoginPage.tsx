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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUserServiceAuthenticateUser } from "../components/openapi/queries";
import React, { useState } from "react";
import Cookies from "universal-cookie";

export default function LoginPage() {
  const authenticationMutation = useUserServiceAuthenticateUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleLoginSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    authenticationMutation.mutate({
      request: {
        username: username,
        password: password,
      },
    }, {
      onSuccess: (data) => {
        const cookies = new Cookies()
        cookies.set("userId", data.id, {
          path: "app/"
        })
        navigate("/app/home")
      }
    });
  };

  return (
    <BasePage loading={authenticationMutation.isPending}>
      <Typography color={"primary"} variant="h5" mb={2}>
        Login
      </Typography>
      <Card>
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleLoginSubmission}
          >
            <Stack gap={2}>
              <TextField
                required
                id="name"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.currentTarget.value)}
              ></TextField>
              <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              ></TextField>
              <Button type="submit" color="success">
                Login
              </Button>
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            Don't have an account yet?
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Sign up here:{" "}
            <Link color={"info.main"} component={RouterLink} to={"/register"}>
              Create account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </BasePage>
  );
}
