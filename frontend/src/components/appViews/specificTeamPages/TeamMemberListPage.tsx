import { Autocomplete, Box, Button, Divider, Modal, Stack, SxProps, TextField, Typography } from '@mui/material'
import PublicUserRow from '../../userDisplay/PublicUserRow'
import {
	usePenaltyServiceAddPenalty,
	useTeamServiceGetTeam,
	useUserServiceGetUsersMemberBatch,
} from '../../openapi/queries'
import useAppContext from '../../hooks/appContext'
import { Law, UserPublic } from '../../openapi/requests'
import { useState } from 'react'
import useTeamContext from '../../hooks/teamContext'
import { ModalBase } from '../../modals/ModalBase'
import InviteUserModal from '../../modals/InviteUserModal'

interface PenaltyModalProps {
	open: boolean
	onClose: Function
	targetMember: UserPublic | undefined
	issuer: UserPublic
	laws: Law[]
}

function PenaltyModal(props: PenaltyModalProps) {
	const { open, onClose, targetMember, issuer, laws } = props
	const issuePenalty = usePenaltyServiceAddPenalty()
	const [selectedLaw, setSelectedLaw] = useState<Law>()
	const [comment, setComment] = useState<string>()

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!targetMember || !selectedLaw) return
		issuePenalty.mutate(
			{
				request: {
					targetUserId: targetMember.id,
					issuerUserId: issuer.id,
					lawId: selectedLaw.id,
					comment: comment,
				},
			},
			{ onSuccess: () => onClose() },
		)
		console.log('penalty')
	}

	const onChangeLaw = (law?: Law | null) => {
		if (law) {
			setSelectedLaw(law)
		}
	}

	return (
		<Modal open={open} onClose={() => onClose()}>
			<Box component={'form'} sx={ModalBase} onSubmit={onSubmit}>
				{targetMember == undefined ? (
					<Typography>Help</Typography>
				) : (
					<Typography variant='h5' mb={1}>
						Let's penalize {targetMember.username}!
					</Typography>
				)}
				<Divider />
				<Autocomplete
					sx={{ marginTop: 2 }}
					options={laws}
					getOptionLabel={(law: Law) => law.title ?? 'Unknown law'}
					renderInput={params => <TextField {...params} label={'Law'} />}
					onChange={(_, value) => onChangeLaw(value)}
					fullWidth
				/>
				<TextField
					multiline
					fullWidth
					variant={'outlined'}
					placeholder={'Comment'}
					onChange={e => setComment(e.target.value)}
				/>
				<Button type={'submit'}>Submit</Button>
			</Box>
		</Modal>
	)
}

function PenaltyButton(props: { onCLick: React.MouseEventHandler<HTMLButtonElement> }) {
	return (
		<Button onClick={props.onCLick} variant={'outlined'} color={'error'}>
			Penalize
		</Button>
	)
}

function TeamMemberListPage() {
	const appContext = useAppContext()
	const teamContext = useTeamContext()
	const [penaltyModalOpen, setPenaltyModalOpen] = useState(false)
	const [inviteModalOpen, setInviteModalOpen] = useState(false)
	const [selectedMember, setSelectedMember] = useState<UserPublic>()
	const { data: currentTeam } = useTeamServiceGetTeam({
		id: appContext.currentTeamId ?? '',
	})
	const { data: members } = useUserServiceGetUsersMemberBatch({
		ids:
			currentTeam?.members
				?.map(m => m.id)
				.filter(id => id != undefined)
				.join(',') ?? '',
	})

	if (!members) {
		return <Typography>No members found</Typography>
	}

	const onSelectMember = (member: UserPublic) => {
		setSelectedMember(member)
		setPenaltyModalOpen(true)
	}

	return (
		<Box>
			<Stack direction={'row'} justifyContent={'space-between'}>
				<Typography color={'primary'}>Members</Typography>
				<Button onClick={() => setInviteModalOpen(true)}>Add Member</Button>
			</Stack>
			<Stack gap={2}>
				{members.map(member => (
					<PublicUserRow
						key={member.id}
						user={member}
						actionButton={<PenaltyButton onCLick={() => onSelectMember(member)} />}
					/>
				))}
			</Stack>
			<PenaltyModal
				open={penaltyModalOpen}
				onClose={() => setPenaltyModalOpen(false)}
				targetMember={selectedMember}
				issuer={appContext.user.data}
				laws={teamContext.team.law ?? []}
			/>
			<InviteUserModal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
		</Box>
	)
}

export default TeamMemberListPage
