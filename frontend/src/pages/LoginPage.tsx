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
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { cookies } from "../App";
import { useUserServiceAuthenticateUser } from "../components/openapi/queries";
import BasePage from "./BasePage";

export default function LoginPage() {
  const authenticationMutation = useUserServiceAuthenticateUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    authenticationMutation.mutate(
      {
        request: {
          username: username,
          password: password,
        },
      },
      {
        onSuccess: (data) => {
          cookies.set("userId", data.id, {
            path: "app/",
          });
          navigate("/app/home");
        },
      }
    );
  };

  return (
    <BasePage loading={authenticationMutation.isPending}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleLoginSubmission}
          >
            <Typography
              align="center"
              color={"secondary.main"}
              variant="h3"
              mb={2}
            >
              Login
            </Typography>
            <Stack gap={2}>
              <TextField
                required
                id="name"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.currentTarget.value)}
                color="primary"
              />
              <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  sx={{
                    borderRadius: 3,
                  }}
                  size="large"
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardContent align="center">
          <Typography variant="body1" color="white">
            Don't have an account yet?
          </Typography>
          <Typography variant="body1" color="white">
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
