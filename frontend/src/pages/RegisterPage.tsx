import { Box, Button, Card, CardContent, Divider, Link, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { cookies } from '../App'
import { useUserServiceRegisterUser } from '../components/openapi/queries'
import { PenaltyThingTheme } from '../theme'
import BasePage from './BasePage'


export default function RegisterPage() {
	const registerUserMutation = useUserServiceRegisterUser()
	const [firstName, setFirstName] = useState<string>()
	const [lastName, setLastName] = useState<string>()
	const [username, setUsername] = useState<string>()
	const [email, setEmail] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [passwordConfirm, setPasswordConfirm] = useState<string>()

	const navigate = useNavigate()

	const registerSubmissionHandler = (event: React.FormEvent) => {
		event.preventDefault()
		if (password != passwordConfirm) {
			console.log('Passwords does not match')
			return
		}

		registerUserMutation.mutate(
			{
				request: {
					username: username,
					email: email,
					password: password,
					firstName: firstName,
					lastName: lastName,
				},
			},
			{
				onSuccess: data => {
					cookies.set('userId', data.id, {
						path: 'app/',
					})
					navigate('/app/home')
				},
				onError: data => {
					console.log(data)
				},
			},
		)
	}

	return (
		<BasePage loading={registerUserMutation.isPending}>
			<Typography color={'primary'} variant='h5' mb={2}>
				Register
			</Typography>
			<Card sx={{ borderRadius: 3, width: '100%' }}>
				<CardContent>
					<Box component='form' noValidate autoComplete='off' onSubmit={registerSubmissionHandler}>
					<Stack gap={4}>
						<Stack direction='row' justifyContent='space-between' gap={4}>
							<TextField
								fullWidth
								id='firstname'
								label='First name'
								variant='outlined'
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							></TextField>
							<TextField
								fullWidth
								id='lastname'
								label='Last name'
								variant='outlined'
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							></TextField>
						</Stack>
						<TextField
							required
							id='name'
							label='Username'
							variant='outlined'
							onChange={e => setUsername(e.target.value)}
						></TextField>
						<TextField
							required
							id='email'
							label='Email'
							variant='outlined'
							onChange={e => setEmail(e.target.value)}
						></TextField>
						<TextField
							required
							id='password'
							label='Password'
							variant='outlined'
							type='password'
							onChange={e => setPassword(e.target.value)}
						></TextField>
						<TextField
							required
							id='password-confirm'
							label='Confirm password'
							variant='outlined'
							type='password'
							onChange={e => setPasswordConfirm(e.target.value)}
						></TextField>
						
						<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
							<Button type='submit' color='success' variant='contained'>
								Register
							</Button>
							<Typography variant='body1' sx={{ color: PenaltyThingTheme.palette.text.primary }}>
								Already have an account?{' '}
								<Link color={'info.main'} component={RouterLink} to={'/login'}>
									Login
								</Link>
							</Typography>
						</Box>

						<Box display="flex" flexDirection="column" alignItems="center">
						<Typography
							textAlign={'left'}
							variant='subtitle1'
							sx={{ color: '' }}
						>
							Warning: This site is still under development; we do not guarantee security.
						</Typography>
						<Typography
							textAlign={'left'}
							variant='subtitle2'
							sx={{ color: PenaltyThingTheme.palette.text.primary }}
						>
							Please do not use your real password; we recommend generating one using your password manager.
						</Typography>
					</Box>
					</Stack>
						
					</Box>
				</CardContent>
				<Divider />
			</Card>
		</BasePage>
	)
}
