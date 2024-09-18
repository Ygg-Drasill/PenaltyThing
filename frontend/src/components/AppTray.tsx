import {
  HouseSharp,
  RequestQuoteSharp,
  WorkspacesSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Button,
  Card,
  CircularProgress,
  ClickAwayListener,
  Fade,
  IconButton,
  Link,
  Paper,
  Popper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserInfo } from "./openapi/requests";
import useAppContext from "./hooks/appContext";
import { useUserServiceGetUserInfo } from "./openapi/queries";

function userInitials(user: UserInfo) {
  const firstInitial = user.firstName?.slice(0, 1).toLocaleUpperCase() ?? "";
  const secondInitial = user.lastName?.slice(0, 1).toLocaleUpperCase() ?? "";
  return firstInitial + secondInitial;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 8,
    top: 8,
    border: `2px solid ${theme.palette.background.default}`,
    padding: '6px 6px',
    color: theme.palette.secondary.contrastText,
  },
}));

function AppTrayButton(props: { to: string; icon: React.ReactElement, notifications: number }) {
  return (
    <Link component={RouterLink} to={props.to} draggable={false}>
      <StyledBadge badgeContent={props.notifications.toString()} color="secondary" invisible={props.notifications < 1}>
        <Button variant="outlined" color="secondary" sx={{ height: "4rem" }}>
          {props.icon}
        </Button>
      </StyledBadge>
    </Link>
  );
}

function AppTray() {
  const appContext = useAppContext()
  const user = appContext.user.data;
  const userInfoResult = useUserServiceGetUserInfo({id: user?.id}, null, {enabled: !!user?.id})
  const userInfo = userInfoResult.data
  const [accountPopperAnchor, setAccountPopperAnchor] =
    useState<null | HTMLElement>(null);

  const handleToggleAccountPopper = (e: React.MouseEvent<HTMLElement>) => {
    setAccountPopperAnchor(accountPopperAnchor ? null : e.currentTarget);
  };

  const accountPopperOpen = Boolean(accountPopperAnchor);

  if (userInfoResult.isLoading) {
    return <CircularProgress />
  }
  
  return (
    <Paper sx={{ backgroundColor: "background.default" }}>
      <Stack
        height={"100%"}
        boxSizing={"content-box"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        <Stack height={"100%"} minWidth={"1rem"} padding={1} gap={1}>
          <AppTrayButton to="/app/home" icon={<HouseSharp />} 
            notifications={appContext.notifications.data?.filter(n => n.type == "INVITATION").length ?? 0}/>
          <AppTrayButton to="/app/penalties" icon={<RequestQuoteSharp />} 
            notifications={appContext.notifications.data?.filter(n => n.type == "PENALTY").length ?? 0}/>
          <AppTrayButton to="/app/teams" icon={<WorkspacesSharp />} 
            notifications={0}/>
        </Stack>
        <Box
          display={"flex"}
          padding={1}
          height={"4rem"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <ClickAwayListener onClickAway={() => setAccountPopperAnchor(null)}>
            <IconButton
              type="button"
              color="info"
              onClick={handleToggleAccountPopper}
            >
              <Avatar sx={{ backgroundColor: "secondary.main" }}>
                {user ? userInitials(userInfo) : "  "}
              </Avatar>
            </IconButton>
          </ClickAwayListener>
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
            <Card sx={{ marginLeft: "2rem" }}>
              <Stack direction={"column"} padding={2} gap={2}>
                <Stack direction={"row"} gap={2}>
                  <Typography variant="subtitle1" color={"primary.light"}>
                    Account
                  </Typography>
                  <Link component={RouterLink} to={"/login"}>
                    <Button variant="contained" color="error">
                      Logout
                    </Button>
                  </Link>
                </Stack>
                <Typography variant="subtitle2">{`${userInfo.firstName} ${userInfo.lastName}`}</Typography>
              </Stack>
            </Card>
          </Fade>
        )}
      </Popper>
    </Paper>
  );
}

export default AppTray;
