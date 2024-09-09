import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material"
import { useTeamServiceCreateTeam, useTeamServiceGetTeamsByUserIdKey } from "../../openapi/queries"
import { useContext, useState } from "react"
import { AppContext } from "../../hooks/appContext"
import { queryClient } from "../../../queryClient"
import BasePage from "../../../pages/BasePage"
function TeamCreatePage() {
    const [teamName, setTeamName] = useState("") 
    const createTeamMutation = useTeamServiceCreateTeam()
    const appContext = useContext(AppContext)

    const handleTeamCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!appContext.user?.id) {
            return
        }
        createTeamMutation.mutate({
            request: {
                name: teamName,
                userId: appContext.user.id
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
        <BasePage loading={false}>
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
        </BasePage>
    )
}

export default TeamCreatePage