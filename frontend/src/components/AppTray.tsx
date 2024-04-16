import { HouseSharp, RequestQuoteSharp, WorkspacesSharp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Fade,
  IconButton,
  Link,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserPublic } from "./openapi/requests";

function userInitials(user: UserPublic) {
  const firstInitial = user.firstName?.slice(0, 1).toLocaleUpperCase() ?? ""
  const secondInitial = user.lastName?.slice(0, 1).toLocaleUpperCase() ?? ""
  return firstInitial + secondInitial
}

function AppTrayButton(props: { to: string, icon: React.ReactElement }) {
    return (
    <Link component={RouterLink} to={props.to}>
        <Button variant="outlined" color="secondary" sx={{ height: "4rem" }}>
        {props.icon}
        </Button>
    </Link>
  );
}

function AppTray(props: {user?: UserPublic, isLoading: boolean}) {
  const user = props.user
  const [accountPopperAnchor, setAccountPopperAnchor] =
    useState<null | HTMLElement>(null);

  const handleToggleAccountPopper = (e: React.MouseEvent<HTMLElement>) => {
    setAccountPopperAnchor(accountPopperAnchor ? null : e.currentTarget);
  };

  const accountPopperOpen = Boolean(accountPopperAnchor);

  return (
    <Paper sx={{ backgroundColor: "background.default" }}>
      <Stack
        height={"100%"}
        boxSizing={"content-box"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        <Stack height={"100%"} minWidth={"1rem"} padding={1} gap={1}>
          <AppTrayButton to="/app/home" icon={<HouseSharp />} />
          <AppTrayButton to="/app/penalties" icon={<RequestQuoteSharp />} />
          <AppTrayButton to="/app/team" icon={<WorkspacesSharp />} />
        </Stack>
        <Box
          display={"flex"}
          padding={1}
          height={"4rem"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton
            type="button"
            color="info"
            onClick={handleToggleAccountPopper}
          >
            <Avatar sx={{ backgroundColor: "secondary.main" }}>{user ? userInitials(user) : "  "}</Avatar>
          </IconButton>
        </Box>
      </Stack>



      <Popper
        open={accountPopperOpen}
        anchorEl={accountPopperAnchor}
        placement="right-end"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <Card sx={{marginLeft: "2rem"}}>
                <Stack direction={"column"} padding={2} gap={2}>
                    <Typography>Account</Typography>
                    <Link component={RouterLink} to={"/login"}>
                        <Button variant="contained" color="error">Logout</Button>
                    </Link>
                </Stack>
            </Card>
          </Fade>
        )}
      </Popper>
    </Paper>
  );
}

export default AppTray;
