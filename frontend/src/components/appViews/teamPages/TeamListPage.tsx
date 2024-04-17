import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import { Box, Link, Typography } from "@mui/material"
import { Team } from "../../openapi/requests"
import { Link as RouterLink } from "react-router-dom"

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
        <Link component={RouterLink} to={`../${props.team.id}`}><Typography variant="h1">{props.team.name ?? "name not found"}</Typography></Link>
    )
}

export default TeamListPage