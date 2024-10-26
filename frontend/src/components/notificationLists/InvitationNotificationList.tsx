import { Box, Button, CircularProgress, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import useAppContext from '../hooks/appContext'
import {
	useInvitationServiceAcceptInvitation,
	useInvitationServiceInfo,
	useNotificationServiceDismiss,
	useNotificationServiceGetFilteredKey,
} from '../openapi/queries'
import { Check, Clear } from '@mui/icons-material'
import { Notification } from '../openapi/requests'
import { useQueryClient } from '@tanstack/react-query'

function InvitationNotification(props: { notification: Notification }) {
	const acceptInvitation = useInvitationServiceAcceptInvitation()
	const dismissInvitationMutation = useNotificationServiceDismiss()
	const invitationInfo = useInvitationServiceInfo({ id: atob(props.notification.data.toString()) })
	const client = useQueryClient()
	const onClickAccept = () => {
		acceptInvitation.mutate(
			{
				request: {
					invitationId: atob(props.notification.data.toString()),
					userId: props.notification.receiverId,
					notificationId: props.notification.id,
				},
			},
			{
				onSuccess: () => client.invalidateQueries({ queryKey: [useNotificationServiceGetFilteredKey] }),
			},
		)
	}

	const onClickDismiss = () => {
		if (props.notification.id === undefined) {
			return
		}
		dismissInvitationMutation.mutate(
			{ id: props.notification.id },
			{ onSuccess: () => client.invalidateQueries({ queryKey: [useNotificationServiceGetFilteredKey] }) },
		)
	}

	if (invitationInfo.isLoading) {
		return <LinearProgress />
	}

	return (
		<Stack
			direction={'row'}
			bgcolor={'background.paper'}
			padding={2}
			justifyContent={'space-between'}
			borderRadius={2}
		>
			<Stack direction={'row'} gap={1}>
				<Typography variant='h6'>{invitationInfo.data.senderName}</Typography>
				<Typography variant='h6' color={'secondary.main'}>
					has invited you to join
				</Typography>
				<Typography variant='h6'>{invitationInfo.data.teamName}</Typography>
			</Stack>
			<Stack flexDirection={'row'} gap={2}>
				<Tooltip title='Accept'>
					<Button
						variant='outlined'
						color='success'
						disabled={acceptInvitation.isPending}
						onClick={onClickAccept}
					>
						{acceptInvitation.isPending ? <CircularProgress size={24} /> : <Check />}
					</Button>
				</Tooltip>
				<Tooltip title='Ignore'>
					<Button variant='outlined' color='error' onClick={onClickDismiss}>
						{dismissInvitationMutation.isPending ? <CircularProgress size={24} /> : <Clear />}
					</Button>
				</Tooltip>
			</Stack>
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
		<Stack gap={2}>
			{invitations.map(i => (
				<InvitationNotification key={i.id} notification={i} />
			))}
		</Stack>
	)
}
