import { Box, Stack, Typography } from "@mui/material";
import PublicUserRow from "../../userDisplay/PublicUserRow";
import { useTeamServiceGetTeam, useUserServiceGetUsersMemberBatch } from "../../openapi/queries";
import useAppContext from "../../hooks/appContext";


function TeamMemberListPage() {
    const appContext = useAppContext()
    const {data: currentTeam} = useTeamServiceGetTeam({id: appContext.currentTeamId ?? ""})
    const {data: members} = useUserServiceGetUsersMemberBatch({ids: currentTeam?.members?.map(m => m.id).filter(id => id != undefined).join(",") ?? ""})
    
    if (!members) {
        return <Typography>No members found</Typography>
    }

    return (
    <Box>
        <Typography color={"primary"}>Members</Typography>
        <Stack>
            {members.map(member => <PublicUserRow key={member.id} user={member} />)}
        </Stack>
    </Box>
    )
}

export default TeamMemberListPage;