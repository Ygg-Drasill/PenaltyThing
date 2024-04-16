import { Outlet } from "react-router-dom"
import AppView from "./AppView"

function TeamView() {
    return (
        <AppView title={"Team"}>
            <Outlet/>
        </AppView>
    )
}

export default TeamView