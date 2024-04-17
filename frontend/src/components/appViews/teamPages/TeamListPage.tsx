import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import { Box, Typography } from "@mui/material"
import { Team } from "../../openapi/requests"

function TeamListPage() {
    const appContext = useContext(AppContext)

    return (
        <Box>
            {appContext.teams?.map((team) => <TeamListItem team={team} />)}
        </Box>
    )
}

function TeamListItem(props: {team: Team}) {

    return (
        <Typography variant="h1">{props.team.name ?? "name not found"}</Typography>
    )
}

export default TeamListPage