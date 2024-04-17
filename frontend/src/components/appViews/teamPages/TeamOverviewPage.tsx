import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeamServiceGetTeamById } from "../../openapi/queries";

function TeamOverviewPage() {
    const teamId = useParams().teamId

    const team = useTeamServiceGetTeamById({teamId: teamId})

    return (
        <Box>
            {team.isLoading && <Typography>Loading...</Typography>}
            
        </Box>
    )
}

export default TeamOverviewPage