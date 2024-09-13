import { Autocomplete, Box, Button, Divider, Modal, Stack, SxProps, TextField, Typography } from "@mui/material";
import PublicUserRow from "../../userDisplay/PublicUserRow";
import { usePenaltyServiceAddPenalty, useTeamServiceGetTeam, useUserServiceGetUsersMemberBatch } from "../../openapi/queries";
import useAppContext from "../../hooks/appContext";
import { Law, UserPublic } from "../../openapi/requests";
import { useState } from "react";
import { Theme } from "@emotion/react";
import useTeamContext from "../../hooks/teamContext";

const PenaltyModalStyle:SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: "background.default",
    padding: 2,
    borderRadius: 2
}

interface PenaltyModalProps {
    open: boolean,
    onClose: Function,
    targetMember: UserPublic | undefined,
    issuer: UserPublic
    laws: Law[]
}

function PenaltyModal(props: PenaltyModalProps) {
    const {open, onClose, targetMember, issuer, laws} = props
    const issuePenalty = usePenaltyServiceAddPenalty()
    const [selectedLaw, setSelectedLaw] = useState<Law>()
    const [comment, setComment] = useState<string>()
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!targetMember || !selectedLaw) return
        issuePenalty.mutate({request: { 
            targetUserId: targetMember.id, 
            issuerUserId: issuer.id,
            lawId: selectedLaw.id,
            comment: comment}}, {onSuccess: () => onClose()})
        console.log("penalty")
    }

    const onChangeLaw = (law?: Law | null) => {
        if (law) {
            setSelectedLaw(law)
        }
    }
    
    return (
        <Modal open={open} onClose={() => onClose()}>
            <Box component={"form"} sx={PenaltyModalStyle} onSubmit={onSubmit}>
                {targetMember == undefined ? <Typography>Help</Typography> : <Typography variant="h5" mb={1}>Let's penaltise {targetMember.firstName}!</Typography>}
                <Divider/>
                <Autocomplete
                    disablePortal
                    sx={{marginTop: 2}}
                    options={laws}
                    getOptionLabel={(law:Law) => law.title ?? "Unknown law"}
                    renderInput={(params) => <TextField {...params} label={"Law"}/>}
                    onChange={(_, value) => onChangeLaw(value)}
                    fullWidth
                />
                <TextField multiline fullWidth variant={"outlined"} placeholder={"Comment"} onChange={(e) => setComment(e.target.value)} />
                <Button type={"submit"}>Submit</Button>
            </Box>
        </Modal>
    )
}


function PenaltyButton(props: {onCLick: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Button onClick={props.onCLick} variant={"outlined"} color={"error"}>Penaltise</Button>
    )
}

function TeamMemberListPage() {
    const appContext = useAppContext()
    const teamContext = useTeamContext()
    const [open, setOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<UserPublic>()
    const {data: currentTeam} = useTeamServiceGetTeam({id: appContext.currentTeamId ?? ""})
    const {data: members} = useUserServiceGetUsersMemberBatch({ids: currentTeam?.members?.map(m => m.id).filter(id => id != undefined).join(",") ?? ""})
    
    if (!members) {
        return <Typography>No members found</Typography>
    }

    const onSelectMember = (member: UserPublic) => {
        setSelectedMember(member)
        setOpen(true)
    }

    return (
    <Box>
        <Typography color={"primary"}>Members</Typography>
        <Stack>
            {members.map(member => <PublicUserRow key={member.id} user={member} actionButton={<PenaltyButton onCLick={() => onSelectMember(member)}/>} />)}
        </Stack>
        <PenaltyModal onClose={() => setOpen(false)} open={open} targetMember={selectedMember} issuer={appContext.user} laws={teamContext.team.law ?? []}/>
    </Box>
    )
}

export default TeamMemberListPage;