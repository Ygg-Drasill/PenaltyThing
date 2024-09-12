import { Theme } from "@emotion/react";
import { Add, AddOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, Divider, Modal, Stack, SxProps, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useLawServiceCreateLaw } from "../../openapi/queries";
import useAppContext, { AppContext } from "../../hooks/appContext";

const AddLawModalStyle:SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: "background.default",
    padding: 2,
    borderRadius: 2
}

function AddLawModal(props: {open: boolean, teamId: string, onClose: Function}) {
    const [lawTitle, setLawTitle] = useState("")
    const [lawDescription, setLawDescription] = useState("")

    const createLawMutation = useLawServiceCreateLaw({ onSuccess: () => {
        props.onClose()
    }})

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createLawMutation.mutate({request: {
            teamId: props.teamId,
            title: lawTitle,
            description: lawDescription,
        }})
    }

    return (
        <Modal open={props.open} onClose={() => props.onClose()}>
            <Box component={"form"} sx={AddLawModalStyle}>
                <Typography variant={"h5"} color={"secondary"}>Add new law</Typography>
                <Divider/>
                <Stack direction={"row"} gap={2} my={4}>
                    <TextField required variant={"filled"} onChange={(e) => setLawTitle(e.currentTarget.value)} placeholder="Title"/>
                    <Button color="success" onSubmit={onSubmit}>{createLawMutation.isPending ? <CircularProgress /> : <Add />}</Button>
                </Stack>
                <TextField multiline fullWidth variant={"outlined"} onChange={(e) => setLawDescription(e.currentTarget.value)} placeholder="Description"/>
            </Box>
        </Modal>
    )
}

function TeamLawPage() {
    const appContext = useAppContext()
    const [addLawModalOpen, setAddLawModalOpen] = useState(false)

    return (
        <Box>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography alignSelf={"center"}>Laws</Typography>
                <Button onClick={() => setAddLawModalOpen(!addLawModalOpen)}><AddOutlined/>Add Law</Button>
            </Stack>
            <AddLawModal teamId={appContext.currentTeamId!} open={addLawModalOpen} onClose={() => setAddLawModalOpen(false)}/>
        </Box>
    )
}

export default TeamLawPage;