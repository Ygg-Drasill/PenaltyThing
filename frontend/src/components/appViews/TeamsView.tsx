import Cookies from "universal-cookie"
import { useTeamServiceGetTeamsByUserId } from "../openapi/queries"
import AppView from "./AppView"
import { Box, CircularProgress, TextField } from "@mui/material"
import { useState } from "react"

function TeamsView(props: BaseAppViewProps) {
    const cookies = new Cookies()
    const [viewTitle, setViesTitle] = useState("Teams")
    const teams = useTeamServiceGetTeamsByUserId({userId: cookies.get("userId")})

    if (teams.isLoading) {
        return (
            <AppView title={viewTitle}>
                <CircularProgress />
            </AppView>
        )
    }

    return (
        <AppView title={viewTitle}>
            <AddTeamForm />
        </AppView>
    )
}

export default TeamsView

function AddTeamForm() {
    return (
        <Box component={"form"}>
            <TextField id="teamName" label="Team name" variant="outlined"/>
        </Box>
    )
}