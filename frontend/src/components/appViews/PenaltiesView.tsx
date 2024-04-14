import { Typography } from "@mui/material";
import AppView, { BaseAppViewProps } from "./AppView"
function PenaltiesView(props: BaseAppViewProps) {
    return (
        <AppView title="Incoming Penalties">
            <Typography>Penalties</Typography>
        </AppView>
    )
}

export default PenaltiesView