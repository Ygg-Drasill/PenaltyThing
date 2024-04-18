import { useContext, useState } from "react"
import { AppContext } from "../../hooks/appContext"
import { Box, ButtonBase, Fade, LinearProgress, Slide, Stack, Typography } from "@mui/material"
import { Team, TeamMember } from "../../openapi/requests"
import { useUserServiceGetUser } from "../../openapi/queries"
import { useTheme } from "@emotion/react"

function TeamListPage() {
    const appContext = useContext(AppContext)
    const [selectedTeam, setSelectedTeam] = useState<Team>()

    if (!appContext.teams) {
        return (
            <LinearProgress />
        )
    }

    return (
        <Box display={"flex"} flexDirection={"row"} gap={4} paddingTop={4}>
            <Stack gap={2} flexGrow={1}>
                {appContext.teams.map((team) => <TeamListItem key={team.id} team={team} selectHandler={(team) => {setSelectedTeam(team); console.log(team)}} />)}
            </Stack>
            {selectedTeam &&
                <Box padding={2} border={"1px solid rgb(0,0,0,0.12)"} borderTop={"8px solid rgb(0,0,0,0.12)"} flexGrow={selectedTeam ? 2 : 0} borderRadius={1} sx={{animation: "0.5s flex-grow ease-out"}}>
                    <Stack gap={2}>
                        {selectedTeam?.members?.map((member) => <TeamMemberListItem key={member.id} member={member} />)}
                    </Stack>
                </Box>
            }
            
        </Box>
    )
}

function TeamListItem(props: {team: Team, selectHandler: (team: Team) => void}) {

    return (
        <Box component={ButtonBase} justifyContent={"flex-start"} borderRadius={1} border={"1px solid rgb(0,0,0,0.12)"} padding={1} onClick={() => props.selectHandler(props.team)}>
            <Typography variant="h6">{props.team.name ?? "name not found"}</Typography>
        </Box>
    )
}

function TeamMemberListItem(props: {member: TeamMember}) {
    const {data: userPublic} = useUserServiceGetUser({id: props.member.userId ?? ""})
    const theme = useTheme()

    return (
        <Box borderRadius={1} border={"1px solid rgb(0,0,0,0.12)"} padding={1} sx={{backgroundColor: theme}} boxShadow={"0px 5px 25px -15px rgb(0,0,0,0.25)"}>
            <Stack direction={"row"} gap={1}>
                <Typography variant="h6">{userPublic?.firstName ? userPublic?.firstName : "name not found"}</Typography>
                <Typography variant="h6">{userPublic?.firstName ? userPublic?.lastName : "name not found"}</Typography>
            </Stack>
        </Box>
    )
}

export default TeamListPage