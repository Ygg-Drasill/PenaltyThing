import { LinearProgress, Stack, Typography } from '@mui/material'
import useAppContext from '../hooks/appContext'

export default function PenaltyNotificationList() {
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
				<Typography key={p.id}>You have been penalized with {atob(p.data.toString())}</Typography>
			))}
		</Stack>
	)
}
