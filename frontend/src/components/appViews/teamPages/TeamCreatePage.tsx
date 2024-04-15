import { Box, Button, TextField } from "@mui/material"
import { useTeamServiceCreateTeam } from "../../openapi/queries"
import { useState } from "react"
import { useTeamPageOutletContext } from "../../hooks/useTeamPageOutletContext"

function TeamCreatePage() {
    const [teamName, setTeamName] = useState("") 
    const createTeamMutation = useTeamServiceCreateTeam()
    const teamPageContext = useTeamPageOutletContext()

    const handleTeamCreateTeamSubmit = () => {
        createTeamMutation.mutate({
            request: {
                name: teamName,
                userId: teamPageContext.user?.id
            }
        })
    }

    return (
        <Box component={"form"} onSubmit={handleTeamCreateTeamSubmit}>
            <TextField
              id="teamName"
              label="Team name"
              value={teamName}
              onChange={(e) => setTeamName(e.currentTarget.value)}
            />
            <Button type="submit" color="success">Create</Button>
        </Box>
    )
}

export default TeamCreatePage