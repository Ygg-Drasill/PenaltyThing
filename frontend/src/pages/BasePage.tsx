import { Backdrop, CircularProgress, Container } from '@mui/material'
import { ReactNode } from 'react'

interface BasePageProps {
	loading?: boolean
	children: ReactNode
}

export default function BasePage(props: BasePageProps) {
	return (
		<>
			<Backdrop open={props.loading ?? false} sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Container
				sx={{
					height: '100vh',
					alignItems: 'center',
					justifyContent: 'center',
					paddingTop: '10vh',
				}}
			>
				{props.children}
			</Container>
		</>
	)
}
