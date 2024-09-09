import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import { Button, Link, Stack, Typography } from "@mui/material"
import { Team } from "../../openapi/requests"
import { Link as RouterLink } from "react-router-dom";

function TeamListPage() {
    const appContext = useContext(AppContext)

    return (
        <Stack gap={1} mt={4} mx={2}>
            {appContext.teams?.map((team) => <TeamListItem team={team} />)}
        </Stack>
    )
}

function TeamListItem(props: {team: Team}) {
    return (
        <Link component={RouterLink} to={"/app/team/" + props.team.id} draggable={false}>
            <Button fullWidth sx={{justifyContent: "start", textTransform: "none"}}>
                <Typography color={"primary"}>
                    {props.team.name ?? "name not found"}
                </Typography>
            </Button>
        </Link>
    )
}

export default TeamListPage