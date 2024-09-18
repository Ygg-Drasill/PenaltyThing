import { LinearProgress, Stack, Typography } from "@mui/material";
import useAppContext from "./hooks/appContext";
import { useInvitationServiceAcceptInvitation } from "./openapi/queries";

function InvitationNotification(props: {invitationId: string}) {
    const acceptInvitation = useInvitationServiceAcceptInvitation()

}

export default function NotificationList() {
    const appContext = useAppContext()
    const notifications = appContext.notifications;

    if (notifications.isLoading) {
        return <LinearProgress />
    }

    return (
        <Stack>
            {notifications.data.map(n => {
                if (n.type == "INVITATION") {
                    return <></>
                }
                return (
                    <Typography>{n.id} {n.type}</Typography>
                )
            })}
        </Stack>
    )
}