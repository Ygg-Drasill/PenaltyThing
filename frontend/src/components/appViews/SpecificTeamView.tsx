import BasePage from "../../pages/BasePage";
import { Stack, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { useTeamServiceGetTeam, useUserServiceGetUsersMemberBatch } from "../openapi/queries";
import PublicUserRow from "../userDisplay/PublicUserRow";
import AppView from "./AppView";
import IconLinkWithText from "../IconWithText";
import { Team } from "../openapi/requests";
import { GavelTwoTone } from "@mui/icons-material";

interface TeamViewPageBarProps {
    team: Team | undefined
}

function SpecificTeamViewBar(props: TeamViewPageBarProps) {
    return (
        <Stack width={"100%"} direction="row" justifyContent={"flex-end"} gap={4}>
            <IconLinkWithText path={"/app/" + (props.team?.id ?? "") + "/laws"} icon={< GavelTwoTone/>} name="Laws" />
        </Stack>
    )
}

function SpecificTeamView() {
    const { id: teamId } = useParams()
    const {data: team, isLoading} = useTeamServiceGetTeam({id: teamId ?? ""})
    const {data: members} = useUserServiceGetUsersMemberBatch({ids: team?.members?.map(m => m.id).filter(id => id != undefined).join(",") ?? ""})

    return (
        <AppView title={team?.name ?? ""} barComponent={<SpecificTeamViewBar team={team}/>}>
            <BasePage loading={isLoading}>
                <Outlet />
                <Typography color={"primary"}>Members</Typography>
                <Stack>
                    {members && members.map(m => (<PublicUserRow user={m} />))}
                </Stack>
            </BasePage>
        </AppView>
    )
}

export default SpecificTeamView;