import './App.css'

import { Stack, Typography } from '@mui/material'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import AppTray from './components/AppTray'
import AppView from './components/appViews/AppView'
import HomeView from './components/appViews/HomeView'
import PenaltiesView from './components/appViews/PenaltiesView'
import TeamLawPage from './components/appViews/specificTeamPages/TeamLawPage'
import TeamMemberListPage from './components/appViews/specificTeamPages/TeamMemberListPage'
import SpecificTeamView from './components/appViews/SpecificTeamView'
import TeamCreatePage from './components/appViews/teamPages/TeamCreatePage'
import TeamJoinPage from './components/appViews/teamPages/TeamJoinPage'
import TeamListPage from './components/appViews/teamPages/TeamListPage'
import TeamView from './components/appViews/TeamView'
import WheelView from './components/appViews/WheelView'
import { AppContextProvider } from './components/hooks/appContext'
import { useVersionServiceGetVersion } from './components/openapi/queries'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export const cookies = new Cookies()

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='app' element={<InnerApp />}>
						<Route path='home' element={<HomeView />} />
						<Route path='penalties' element={<PenaltiesView />} />
						<Route path='teams' element={<TeamView />}>
							<Route path='create' element={<TeamCreatePage />} />
							<Route path='join' element={<TeamJoinPage />} />
							<Route path='list' element={<TeamListPage />} />
							<Route path='' element={<TeamListPage />} />
						</Route>
						<Route path='wheel' element={<WheelView />}>
						</Route>
						<Route path='team' element={<SpecificTeamView />}>
							<Route path='laws' element={<TeamLawPage />} />
							<Route path='' element={<TeamMemberListPage />} />
						</Route>
						<Route path='*' element={<NoView />} />
					</Route>
					<Route path='*' element={<Navigate replace to={'/app/home'} />} />
				</Routes>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	)
}

export default App

function InnerApp() {
	//TODO: Introduce userSession context where user cookie is passed down to components inside innerApp
	const navigate = useNavigate()
	const [userId, setUserId] = useState(cookies.get('userId'))
	const [currentTeamId, setCurrentTeamId] = useState(cookies.get('teamId'))
	const { data: version } = useVersionServiceGetVersion()

	useEffect(() => {
		if (!userId) {
			navigate('/login')
		} else {
			setUserId(userId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const portrait = window.matchMedia('(orientation: portrait)').matches

	return (
		<AppContextProvider userId={userId} currentTeamId={currentTeamId} setCurrentTeamId={setCurrentTeamId}>
			<Stack
				direction={portrait ? 'column-reverse' : 'row'}
				height={'100vh'}
				padding={portrait ? 2 : 4}
				gap={portrait ? 2 : 4}
				boxSizing={'border-box'}
			>
				<AppTray />
				<Outlet />
			</Stack>
			<Typography position={'absolute'} bottom={0} ml={4} color={'background.default'}>
				v{version}
			</Typography>
		</AppContextProvider>
	)
}

function NoView() {
	return (
		<AppView title='404'>
			<Typography>Page does not exist</Typography>
		</AppView>
	)
}
