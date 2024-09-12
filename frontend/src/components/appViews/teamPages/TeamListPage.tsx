import { SetStateAction, useContext, useState } from "react"
import { AppContext } from "../../hooks/appContext"
import { Button, Link, Stack, Typography } from "@mui/material"
import { Team } from "../../openapi/requests"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function TeamListPage() {
    const appContext = useContext(AppContext)
    const [_, ductTape] = useState("")

    if (appContext.setCurrentTeamId == undefined) {
        return (<Typography>Error</Typography>)
    }

    return (
        <Stack gap={1} mt={4} mx={2}>
            {appContext.teams?.map((team) => <TeamListItem team={team} setTeamId={appContext.setCurrentTeamId ?? ductTape} />)}
        </Stack>
    )
}

function TeamListItem(props: {team: Team, setTeamId: React.Dispatch<SetStateAction<string>>}) {
    const navigate = useNavigate()
    const teamOnClick = () => {
        const cookies = new Cookies()
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