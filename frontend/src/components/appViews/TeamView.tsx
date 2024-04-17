import { Link as RouterLink, Outlet } from "react-router-dom"
import AppView from "./AppView"
import {Button, Link, Stack, Typography, Box} from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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
            <Link component={RouterLink} to={"/app/team/list"} draggable={false}>
                <Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FormatListBulletedIcon style={{ fontSize: 40 }} />
                        <Typography variant="outlined">List</Typography>
                    </Box>
                </Button>
            </Link>

            <Link component={RouterLink} to={"/app/team/list"} draggable={false}>
                <Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <AddCircleIcon style={{ fontSize: 40 }} />
                        <Typography variant="outlined">Create</Typography>
                    </Box>
                </Button>
            </Link>

            <Link component={RouterLink} to={"/app/team/list"} draggable={false}>
                <Button>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <GroupAddIcon style={{ fontSize: 40 }} />
                        <Typography variant="outlined">Join</Typography>
                    </Box>
                </Button>
            </Link>

        </Stack>
    )
}

export default TeamView