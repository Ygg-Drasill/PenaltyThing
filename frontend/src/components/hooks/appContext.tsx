import { createContext, ReactNode, SetStateAction, useContext } from 'react'
import { UserPublic, Team, Notification } from '../openapi/requests'
import {
	useDefaultServiceGet,
	useNotificationServiceGetFiltered,
	usePenaltyServiceGet,
	useTeamServiceGetTeamsByUserId,
	useUserServiceGetUser,
} from '../openapi/queries'
import { UseQueryResult } from '@tanstack/react-query'

type AppContext = {
	user: UseQueryResult<UserPublic, unknown>
	teams: UseQueryResult<Team[], unknown>
	notifications: UseQueryResult<Notification[], unknown>
	currentTeamId: string
	setCurrentTeamId: React.Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<AppContext | undefined>(undefined)

export default function useAppContext() {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('AppContext can only be used within an AppContext tree')
	}
	return context
}

export function AppContextProvider(props: {
	children: ReactNode
	userId: string
	currentTeamId: string
	setCurrentTeamId: React.Dispatch<SetStateAction<string>>
}) {
	const userResult = useUserServiceGetUser({ id: props.userId })
	const teamsResult = useTeamServiceGetTeamsByUserId({ userId: props.userId })
	const notificationsResult = useNotificationServiceGetFiltered({ userId: props.userId, filter: [] }, null, {
		refetchInterval: 5000,
	})

	return (
		<AppContext.Provider
			value={{
				user: userResult,
				teams: teamsResult,
				notifications: notificationsResult,
				currentTeamId: props.currentTeamId,
				setCurrentTeamId: props.setCurrentTeamId,
			}}
		>
			{props.children}
		</AppContext.Provider>
	)
}
