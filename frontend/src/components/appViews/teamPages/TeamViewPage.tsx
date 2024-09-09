import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import BasePage from "../../../pages/BasePage";
import { Fade, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeamServiceGetTeam, useUserServiceGetUsersMemberBatch } from "../../openapi/queries";


function TeamViewPage() {
    const appContext = useContext(AppContext)
    const { id: teamId } = useParams()
    const {data: team, isLoading} = useTeamServiceGetTeam({id: teamId ?? ""})
    const {data: members} = useUserServiceGetUsersMemberBatch({ids: team?.members?.map(m => m.id).filter(id => id != undefined).join(",") ?? ""})

    return (
        <>
            <Fade in><Typography color={"primary"} variant="h5" mb={2}>Welcome to {team?.name}</Typography></Fade>
            <Stack>
                {members && members.map(m => (<Typography>{m.firstName} {m.lastName}</Typography>))}
            </Stack>
        </>
    )
}

export default TeamViewPage;