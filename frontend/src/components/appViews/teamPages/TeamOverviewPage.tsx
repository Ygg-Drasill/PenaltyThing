import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function TeamOverviewPage() {
    const teamId = useParams().teamId

    return (
        <Box>
            <Typography>
                {teamId}
            </Typography>
        </Box>
    )
}

export default TeamOverviewPage