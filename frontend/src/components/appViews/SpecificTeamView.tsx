import { ArrowBack, GavelTwoTone, Home } from '@mui/icons-material'
import { LinearProgress, Stack } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import BasePage from '../../pages/BasePage'
import useAppContext from '../hooks/appContext'
import { TeamContext } from '../hooks/teamContext'
import IconLinkWithText from '../IconWithText'
import { useTeamServiceGetTeam } from '../openapi/queries'
import AppView from './AppView'

function SpecificTeamViewBar() {
	return (
		<Stack direction='row' gap={4}>
			<IconLinkWithText path={'/app/team/laws'} icon={<GavelTwoTone />} name='Laws' />
			<IconLinkWithText path={'/app/team'} icon={<Home />} name='' />
		</Stack>
	)
}

function GoBackButton() {
	const navigate = useNavigate()
	return (
		<IconLinkWithText
			path='/app/teams'
			icon={<ArrowBack />} name={''}	/>
	)
}

function SpecificTeamView() {
	const appContext = useAppContext()
	const navigate = useNavigate()
	const { data: team, isLoading } = useTeamServiceGetTeam({
		id: appContext.currentTeamId,
	})

	if (appContext.currentTeamId == undefined) {
		navigate('/app')
	}

	if (isLoading || !team) return <LinearProgress />

	return (
		<AppView title={team?.name ?? ''} barComponent={<SpecificTeamViewBar />}>
			<GoBackButton />
			<BasePage loading={isLoading}>
				<TeamContext.Provider value={{ team: team }}>
					<Outlet />
				</TeamContext.Provider>
			</BasePage>
		</AppView>
	)
}

export default SpecificTeamView
