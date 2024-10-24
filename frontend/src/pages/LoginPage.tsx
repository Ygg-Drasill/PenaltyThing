import { Box, Button, Card, CardContent, Divider, Link, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { cookies } from '../App'
import { useUserServiceAuthenticateUser } from '../components/openapi/queries'
import BasePage from './BasePage'

export default function LoginPage() {
	const authenticationMutation = useUserServiceAuthenticateUser()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const handleLoginSubmission = (e: React.FormEvent) => {
		e.preventDefault()

		authenticationMutation.mutate(
			{
				request: {
					email: email,
					password: password,
				},
			},
			{
				onSuccess: data => {
					cookies.set('userId', data.id, {
						path: 'app/',
					})
					navigate('/app/home')
				},
			},
		)
	}

	return (
		<BasePage loading={authenticationMutation.isPending}>
			<Box display='flex' justifyContent='center' alignItems='center' minHeight='60vh'>
				<Card sx={{ borderRadius: 3, maxWidth: 500, width: '100%' }}>
					<CardContent>
						<Box component='form' noValidate autoComplete='off' onSubmit={handleLoginSubmission}>
							<Typography align='center' color={'secondary.main'} variant='h3' mb={2}>
								Login
							</Typography>
							<Stack gap={2}>
								<TextField
									sx={{ input: { color: 'white' } }}
									required
									id='email'
									label='Email'
									variant='outlined'
									onChange={e => setEmail(e.currentTarget.value)}
									color='primary'
								/>
								<TextField
									sx={{ input: { color: 'white' } }}
									required
									id='password'
									label='Password'
									variant='outlined'
									type='password'
									onChange={e => setPassword(e.currentTarget.value)}
								/>
								<Box display='flex' justifyContent='center'>
									<Button
										type='submit'
										color='success'
										variant='contained'
										sx={{
											borderRadius: 3,
										}}
										size='large'
									>
										Login
									</Button>
								</Box>
							</Stack>
						</Box>
					</CardContent>
					<Divider />
					<CardContent>
						<Typography variant='body1' color='text' align='center'>
							Don't have an account yet?
						</Typography>
						<Box display='flex' justifyContent='center' mt={1}>
							<Typography variant='body1' color='text'>
								Sign up here:{' '}
								<Link color={'info.main'} component={RouterLink} to={'/register'}>
									Create account
								</Link>
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</BasePage>
	)
}
