import { Theme } from '@emotion/react'
import { Add, AddOutlined } from '@mui/icons-material'
import { Box, Button, CircularProgress, Divider, Modal, Stack, SxProps, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useLawServiceCreateLaw, useLawServiceGetLaws, useLawServiceGetLawsKey } from '../../openapi/queries'
import useAppContext from '../../hooks/appContext'
import { queryClient } from '../../../queryClient'
import { Law } from '../../openapi/requests'

const AddLawModalStyle: SxProps<Theme> = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.default',
	padding: 2,
	borderRadius: 2,
}

function AddLawModal(props: { open: boolean; teamId: string; onClose: Function }) {
	const [lawTitle, setLawTitle] = useState<string>()
	const [lawDescription, setLawDescription] = useState<string>()

	const createLawMutation = useLawServiceCreateLaw()

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		createLawMutation.mutate(
			{
				request: {
					teamId: props.teamId,
					title: lawTitle,
					description: lawDescription,
				},
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [useLawServiceGetLawsKey],
					})
					props.onClose()
				},
			},
		)
	}

	return (
		<Modal open={props.open} onClose={() => props.onClose()}>
			<Box component={'form'} onSubmit={onSubmit} sx={AddLawModalStyle}>
				<Typography variant={'h5'} color={'secondary'}>
					Add new law
				</Typography>
				<Divider />
				<Stack direction={'row'} gap={2} my={4}>
					<TextField
						required
						variant={'filled'}
						onChange={e => setLawTitle(e.currentTarget.value)}
						placeholder='Title'
					/>
					<Button color='success' onClick={onSubmit} onSubmit={onSubmit}>
						{createLawMutation.isPending ? <CircularProgress color='success' /> : <Add />}
					</Button>
				</Stack>
				<TextField
					multiline
					fullWidth
					variant={'outlined'}
					onChange={e => setLawDescription(e.currentTarget.value)}
					placeholder='Description'
				/>
			</Box>
		</Modal>
	)
}

function LawRow(props: { law: Law }) {
	const law = props.law

	return (
		<Stack direction={'row'} justifyContent={'space-between'}>
			<Typography>{law.title}</Typography>
			<Typography>{law.description}</Typography>
		</Stack>
	)
}

function TeamLawPage() {
	const appContext = useAppContext()
	const [addLawModalOpen, setAddLawModalOpen] = useState(false)
	const laws = useLawServiceGetLaws({ teamId: appContext.currentTeamId })

	return (
		<Box>
			<Stack flexDirection={'row'} justifyContent={'space-between'}>
				<Typography alignSelf={'center'}>Laws</Typography>
				<Button onClick={() => setAddLawModalOpen(!addLawModalOpen)}>
					<AddOutlined />
					Add Law
				</Button>
			</Stack>
			<Divider />
			<Stack>{laws.data?.map(law => <LawRow law={law} />)}</Stack>
			<AddLawModal
				teamId={appContext.currentTeamId!}
				open={addLawModalOpen}
				onClose={() => setAddLawModalOpen(false)}
			/>
		</Box>
	)
}

export default TeamLawPage
