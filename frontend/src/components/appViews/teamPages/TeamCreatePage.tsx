import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material"
import { useTeamServiceCreateTeam, useTeamServiceGetTeamsByUserIdKey } from "../../openapi/queries"
import { useState } from "react"
import useAppContext from "../../hooks/appContext"
import { queryClient } from "../../../queryClient"
function TeamCreatePage() {
    const [teamName, setTeamName] = useState("") 
    const createTeamMutation = useTeamServiceCreateTeam()
    const appContext = useAppContext()

    const handleTeamCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!appContext.user?.data.id) {
            return
        }
        createTeamMutation.mutate({
            request: {
                name: teamName,
                userId: appContext.user.data.id
            }
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [useTeamServiceGetTeamsByUserIdKey]
                })
            }
        })
    }

    return (
        <Box component={"form"} onSubmit={handleTeamCreateSubmit}>
            <Stack direction={"row"} gap={2}>
                <TextField
                id="teamName"
                label="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.currentTarget.value)}
                />
                <Button type="submit" color="success">Create{createTeamMutation.isPending && <CircularProgress />}</Button>
            </Stack>
        </Box>
)
}

export default TeamCreatePage