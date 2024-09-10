import { useContext } from "react"
import { AppContext } from "../../hooks/appContext"
import BasePage from "../../../pages/BasePage";
import { Fade, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeamServiceGetTeam, useUserServiceGetUsersMemberBatch } from "../../openapi/queries";
import PublicUserRow from "../../userDisplay/PublicUserRow";
import AppView from "../AppView";


function TeamViewPage() {
    const appContext = useContext(AppContext)
    const { id: teamId } = useParams()
    const {data: team, isLoading} = useTeamServiceGetTeam({id: teamId ?? ""})
    const {data: members} = useUserServiceGetUsersMemberBatch({ids: team?.members?.map(m => m.id).filter(id => id != undefined).join(",") ?? ""})

    return (
        <AppView title={team?.name ?? ""}>
            <BasePage loading={isLoading}>
                <Typography color={"primary"}>Members</Typography>
                <Stack>
                    {members && members.map(m => (<PublicUserRow user={m} />))}
                </Stack>
            </BasePage>
        </AppView>
    )
}

export default TeamViewPage;