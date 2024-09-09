import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import BasePage from "../../../pages/BasePage";
import { Fade, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeamServiceGetTeam, useUserServiceGetUsersBatch } from "../../openapi/queries";


function TeamViewPage() {
    const appContext = useContext(AppContext)
    const { id: teamId } = useParams()
    const {data: team, isLoading} = useTeamServiceGetTeam({id: teamId ?? ""})
    const {data: members} = useUserServiceGetUsersBatch({request: {ids: team?.member?.map(m => m.id).filter(id => id != undefined)}})

    return (
        <BasePage loading={isLoading}>
            <Fade in><Typography color={"primary"} variant="h5" mb={2}>Welcome to {team?.name}</Typography></Fade>
            <Stack>
                {members && members.map(m => (<Typography>{m.firstName}</Typography>))}
            </Stack>
        </BasePage>
    )
}

export default TeamViewPage;