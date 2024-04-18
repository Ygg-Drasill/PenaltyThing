import { Link as RouterLink, Outlet } from "react-router-dom"
import AppView from "./AppView"
import {Button, Link, Stack, Typography} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {ReactNode} from "react";

function TeamView() {
    return (
        <AppView title={"Team"} barComponent={<TeamViewNavbar />}>
            <Outlet/>
        </AppView>
    )
}

function TeamViewNavbar() {
    return (
        <Stack width={"100%"} direction="row" justifyContent={"flex-end"} gap={4}>
            <IconWithText path="/app/team/list" icon={<FormatListBulletedIcon />} name="List" />
            <IconWithText path="/app/team/create" icon={<AddCircleIcon />} name="Create" />
            <IconWithText path="/app/team/join" icon={<GroupAddIcon />} name="Join" />
        </Stack>
    );
}

function IconWithText(props: {path: string, icon: ReactNode, name: string}){
    return(
        <Link component={RouterLink} to={props.path} draggable={false}>
            <Button>
                {props.icon}
                <Typography sx={{marginLeft: 0.5}} variant="outlined">{props.name}</Typography>
            </Button>
        </Link>
    )
}

export default TeamView