import BasePage from "../../pages/BasePage";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AppView from "./AppView";
import IconLinkWithText from "../IconWithText";
import { GavelTwoTone } from "@mui/icons-material";
import { useEffect } from "react";
import useAppContext from "../hooks/appContext";
import { useQuery } from "@tanstack/react-query";
import { TeamService } from "../openapi/requests";
import { TeamContext } from "../hooks/teamContext";


function SpecificTeamViewBar() {
    return (
        <Stack direction="row" gap={4}>
            <IconLinkWithText path={"/app/team/laws"} icon={< GavelTwoTone/>} name="Laws" />
        </Stack>
    )
}

function SpecificTeamView() {
    const appContext = useAppContext()
    
    const navigate = useNavigate()
    const {data: team, isLoading} = useQuery({
        queryKey: [appContext.currentTeamId],
        queryFn: () => {
            if (!appContext || !appContext.currentTeamId) return
            console.log(appContext.currentTeamId);
            return TeamService.getTeam({id: appContext.currentTeamId})
        },
        enabled: appContext.currentTeamId != undefined && appContext.currentTeamId.length > 0
    })
    useEffect(() => {
        console.log(appContext);
        if (appContext && appContext.setCurrentTeamId) {
            appContext.setCurrentTeamId(team?.id ?? "")
        }
    }, [team])

    if (appContext.currentTeamId == undefined) {
        navigate("/app")
    }

    if (!team) return <Typography>Team not found {appContext.currentTeamId.length > 0 ? appContext.currentTeamId : "- no team id"}</Typography>

    return (
        <AppView title={team?.name ?? ""} barComponent={<SpecificTeamViewBar />}>
            <BasePage loading={isLoading}>
                <TeamContext.Provider value={{team: team}}>
                    <Outlet />
                </TeamContext.Provider>
            </BasePage>
        </AppView>
    )
}

export default SpecificTeamView;