import { Outlet } from "react-router-dom"
import { useAppViewOutletContext } from "../hooks/useOutletContext"
import { useTeamServiceGetTeamsByUserId } from "../openapi/queries"
import AppView from "./AppView"

function TeamView() {
    const appViewContext = useAppViewOutletContext()
    const team = useTeamServiceGetTeamsByUserId({userId: appViewContext.user?.id ?? ""})
    return (
        <AppView title={"Team"}>
            <Outlet context={{appViewContext, team}}/>
        </AppView>
    )
}

export default TeamView