import { SetStateAction, useState } from "react"
import useAppContext from "../../hooks/appContext"
import { Button, LinearProgress, Link, Stack, Typography } from "@mui/material"
import { Team } from "../../openapi/requests"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { cookies } from "../../../App";

function TeamListPage() {
    const appContext = useAppContext()

    if (appContext.teams.isLoading) {
        return <LinearProgress />
    }

    return (
        <Stack gap={1} mt={4} mx={2}>
            {appContext.teams.data.map((team) => <TeamListItem team={team} setTeamId={appContext.setCurrentTeamId} />)}
        </Stack>
    )
}

function TeamListItem(props: {team: Team, setTeamId: React.Dispatch<SetStateAction<string>>}) {
    const navigate = useNavigate()
    const teamOnClick = () => {
        cookies.set("teamId", props.team.id ?? "")
        props.setTeamId(props.team.id ?? "")
        navigate("/app/team")
    }

    return (
        <Link component={RouterLink} to={"/app/team"} draggable={false}>
            <Button onClick={teamOnClick} fullWidth sx={{justifyContent: "start", textTransform: "none"}}>
                <Typography color={"primary"}>
                    {props.team.name ?? "name not found"}
                </Typography>
            </Button>
        </Link>
    )
}

export default TeamListPage