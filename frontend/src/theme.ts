import { createTheme, Shadows } from '@mui/material'

export const PenaltyThingTheme = createTheme({
	shadows: Array(25).fill('none') as Shadows,
	typography: {
		allVariants: {
			color: '#f0ede9',
		},
	},
	palette: {
		primary: {
			main: '#86604c',
		},
		secondary: {
			light: '#9498a3',
			main: '#b6a090',
		},
		background: {
			default: '#34393f',
			paper: '#3c3c3c',
		},
		error: {
			main: '#eb2352',
		},
		info: {
			main: '#5cc4ed',
		},
		success: {
			main: '#0A8379',
		},
		text: {},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: ({ theme }) => ({
					'& label.Mui-focused': {
						color: theme.palette.secondary.light,
					},
					'& .MuiOutlinedInput-root': {
						'&.Mui-focused fieldset': {
							borderColor: theme.palette.secondary.light,
						},
					},
				}),
			},
		},
	},
})
