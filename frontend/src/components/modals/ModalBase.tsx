import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'

export const ModalBase: SxProps<Theme> = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.default',
	padding: 2,
	borderRadius: 2,
}
