import { AnnouncementSharp } from "@mui/icons-material"
import { Button, Paper, Stack } from "@mui/material"

function AppTrayButton(props: {icon: React.ReactElement}) {
    return (
        <Button variant="outlined" color="secondary" sx={{height: "4rem"}}>
            {props.icon}
        </Button>
    )
}

function AppTray() {

    return (
        <Paper sx={{backgroundColor: "background.default"}}>
            <Stack height={"100%"} minWidth={"1rem"} padding={1} gap={2}>
                <AppTrayButton icon={<AnnouncementSharp />} />
            </Stack>
        </Paper>
    )
}

export default AppTray