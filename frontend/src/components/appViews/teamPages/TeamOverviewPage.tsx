import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeamServiceGetTeamById } from "../../openapi/queries";

function TeamOverviewPage() {
    const teamId = useParams().teamId

    const team = useTeamServiceGetTeamById({ teamId: teamId })

    if (team.isLoading) {
        return <CircularProgress />
    }

    if (!team.data?.members) {
        return <Typography>404: Team not found</Typography>
    }

    return (
        <Stack>
            <Typography variant="h4">{team.data?.name}</Typography>
            <Typography>Members</Typography>
            {
                team.data.members.map(m => {
                    return (
                        <Typography>{m.id}</Typography>
                    )
                })
            }
        </Stack>
    )
}

export default TeamOverviewPage