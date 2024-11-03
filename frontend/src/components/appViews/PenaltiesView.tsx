import { Typography } from '@mui/material'
import AppView from './AppView'
import PenaltyNotificationList from '../notificationLists/PenaltyNotificationList'

function PenaltiesView() {
	return (
		<AppView title='Incoming Penalties'>
			<Typography>Penalties</Typography>
			<PenaltyNotificationList />
		</AppView>
	)
}

export default PenaltiesView
