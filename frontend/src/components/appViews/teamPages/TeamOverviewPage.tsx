import { Box, CircularProgress, LinearProgress, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeamServiceGetTeamById, useTeamServiceGetTeamByIdKey, useUserServiceGetUserList, useUserServiceGetUserListKey } from "../../openapi/queries";
import { useQuery } from "@tanstack/react-query";
import { TeamMember, TeamService, UserPublic, UserService } from "../../openapi/requests";

function TeamOverviewPage() {
    const teamId = useParams().teamId

    const {data: team, isLoading: teamLoading} = useQuery({
        queryKey: [useTeamServiceGetTeamByIdKey],
        queryFn: () => TeamService.getTeamById({teamId: teamId ?? ""}),
        enabled: !!teamId
    })

    const {data: members, isLoading: membersLoading} = useQuery({
        queryKey: [useUserServiceGetUserListKey],
        queryFn: () => UserService.getUserList({ids: team?.members?.map(m => m.userId) ?? []}),
        enabled: !!team
    })

    if (teamLoading || membersLoading) {
        return <LinearProgress />
    }

    if (!team) {
        return <Typography>404: Team not found</Typography>
    }

    return (
        <Stack>
            <Typography variant="h6">{team.name}</Typography>
            <Typography variant="subtitle1">Members</Typography>
            {
                members?.map(m => (
                    <TeamMemberRow key={m.id} member={m}/>
                ))
            }
        </Stack>
    )
}

function TeamMemberRow(props: {member: UserPublic}) {

    return (
        <Box>
            <Stack direction={"row"} gap={2}>
                <Typography>{props.member.firstName}</Typography>
                <Typography>{props.member.lastName}</Typography>
            </Stack>
        </Box>
    )
}

export default TeamOverviewPage