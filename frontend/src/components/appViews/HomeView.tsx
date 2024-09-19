import { Button, LinearProgress, Link, Stack, Typography } from "@mui/material";
import AppView from "./AppView";
import { Link as RouterLink } from "react-router-dom";
import useAppContext from "../hooks/appContext";
import NotificationList from "../NotificationList";
import InvitationNotificationList from "../NotificationList";

function HomeView() {
    const appContext = useAppContext()

    if (appContext.teams.isLoading) {
        return <AppView title="Home"><LinearProgress /></AppView>
    }

    if (appContext.teams.data != undefined && appContext.teams.data.length == 0) {
        return (
            <AppView title="Home">
                <BecomeMemberOfTeam />
            </AppView>
        )
    }

    return (
        <AppView title="Home">
            <Typography>Home</Typography>
            <InvitationNotificationList />
        </AppView>
    )
}

export default HomeView;

function BecomeMemberOfTeam() {
  return (
    <Stack padding={4} gap={8} width={"100%"} justifyContent={"center"}>
      <Typography variant="h6" color={"secondary.dark"}>
        Looks like you're not part of a team yet!
      </Typography>
      <Stack
        direction={"column"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link component={RouterLink} to={"/app/team/join"}>
          <Button variant="outlined">Join team</Button>
        </Link>
        <Typography>or</Typography>
        <Link component={RouterLink} to={"/app/team/create"}>
          <Button variant="outlined">Create team</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
