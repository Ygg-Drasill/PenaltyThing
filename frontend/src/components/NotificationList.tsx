import { Button, CircularProgress, IconButton, LinearProgress, Stack, Typography } from '@mui/material'
import useAppContext from './hooks/appContext'
import { useInvitationServiceAcceptInvitation } from './openapi/queries'
import { Check, Clear } from '@mui/icons-material'
import { Notification } from './openapi/requests'

function bytesToString(bytes: number[]): string {
	const str = atob(bytes.toString())
	return str
}

function InvitationNotification(props: { notification: Notification }) {
	const acceptInvitation = useInvitationServiceAcceptInvitation()

	const onClickAccept = () => {
		acceptInvitation.mutate({
			request: {
				invitationId: bytesToString(props.notification.data),
				userId: props.notification.receiverId,
				notificationId: props.notification.id,
			},
		})
	}

	const onClickClear = () => {}

	return (
		<Stack direction={'row'}>
			<Typography>You have been invited to team</Typography>
			<Button disabled={acceptInvitation.isPending} onClick={onClickAccept}>
				{acceptInvitation.isPending ? <CircularProgress /> : <Check />}
			</Button>
			<Button onClick={onClickClear}>
				<Clear />
			</Button>
		</Stack>
	)
}

export default function InvitationNotificationList() {
	const appContext = useAppContext()

	if (appContext.notifications.isLoading) {
		return <LinearProgress />
	}

	if (appContext.notifications.data == undefined) {
		return <Typography>no teams</Typography>
	}

	const invitations = appContext.notifications.data.filter(n => n.type == 'INVITATION')

	return (
		<Stack>
			{invitations.map(i => (
				<InvitationNotification key={i.id} notification={i} />
			))}
		</Stack>
	)
}

export function PenaltyNotificationList() {
	const appContext = useAppContext()

	if (appContext.notifications.isLoading) {
		return <LinearProgress />
	}

	if (appContext.notifications.data == undefined) {
		return <Typography>No penalties</Typography>
	}

	const penalties = appContext.notifications.data.filter(n => n.type == 'PENALTY')

	return (
		<Stack>
			{penalties.map(p => (
				<Typography key={p.id}>You have been penalized with {bytesToString(p.data)}</Typography>
			))}
		</Stack>
	)
}
