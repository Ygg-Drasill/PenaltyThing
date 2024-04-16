import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import { Box, Typography } from "@mui/material"

function TeamListPage() {
    const appContext = useContext(AppContext)

    return (
        <Box>
            {appContext.teams?.map((team) => {
                return (
                    <Typography>{team.name}</Typography>
                )
            })}
        </Box>
    )
}

export default TeamListPage