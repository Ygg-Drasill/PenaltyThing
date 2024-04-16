import { Link as RouterLink, Outlet } from "react-router-dom"
import AppView from "./AppView"
import { Button, Link, Stack } from "@mui/material"

function TeamView() {
    return (
        <AppView title={"Team"} barComponent={<TeamViewNavbar />}>
            <Outlet/>
        </AppView>
    )
}

function TeamViewNavbar() {

    return (
        <Stack width={"100%"} direction={"row"} justifyContent={"flex-end"} gap={4}>
            <Link component={RouterLink} to={"/app/team/list"} draggable={false}><Button variant="outlined">List</Button></Link>
            <Link component={RouterLink} to={"/app/team/create"} draggable={false}><Button variant="outlined">Create</Button></Link>
            <Link component={RouterLink} to={"/app/team/join"} draggable={false}><Button variant="outlined">Join</Button></Link>
        </Stack>
    )
}

export default TeamView