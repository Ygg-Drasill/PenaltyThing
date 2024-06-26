import { Button, Link, Stack, Typography } from "@mui/material";
import AppView from "./AppView";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../hooks/appContext";

function HomeView() {
    const appContext = useContext(AppContext)

    if (appContext.teams?.length == 0 || !appContext.teams) {
        return (
            <AppView title="Home">
                <BecomeMemberOfTeam />
            </AppView>
        )
    }

    return (
        <AppView title="Home">
            <Typography>Home</Typography>
        </AppView>
    )
}

export default HomeView

function BecomeMemberOfTeam() {
    return (
        <Stack padding={4} gap={8} width={"100%"} justifyContent={"center"}>
            <Typography variant="h6" color={"secondary.dark"} >Looks like you're not part of a team yet!</Typography>
            <Stack direction={"row"} gap={2} justifyContent={"center"} alignItems={"center"}>
                <Link component={RouterLink} to={"/app/team/join"}><Button variant="outlined">Join team</Button></Link>
                <Typography>or</Typography>
                <Link component={RouterLink} to={"/app/team/create"}><Button variant="outlined">Create team</Button></Link>
            </Stack>
        </Stack>
    )
}