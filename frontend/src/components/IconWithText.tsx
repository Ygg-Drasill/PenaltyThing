import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Link, Typography } from '@mui/material'

export default function IconLinkWithText(props: { path: string; icon: ReactNode; name: string }) {
	return (
		<Link component={RouterLink} to={props.path} draggable={false}>
			<Button>
				{props.icon}
				<Typography sx={{ marginLeft: 0.5 }}>{props.name}</Typography>
			</Button>
		</Link>
	)
}
