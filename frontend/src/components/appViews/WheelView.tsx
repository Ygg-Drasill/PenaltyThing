import { Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ISpinWheelProps, SpinWheel } from 'spin-wheel-game'; // Adjust the import for SpinWheel
import useAppContext from '../hooks/appContext';
import useTeamContext from '../hooks/teamContext';
import { useTeamServiceGetTeam, useUserServiceGetUsersMemberBatch } from '../openapi/queries';
import { UserPublic } from '../openapi/requests';
import AppView from './AppView';

const segments = [
  { segmentText: 'Option 1', segColor: 'red' },
  { segmentText: 'Option 2', segColor: 'blue' },
  { segmentText: 'Option 3', segColor: 'green' },
];

function WheelView() {
    return (
        <AppView title={'Spinning Wheel'}>
            <Stack direction={'column'} gap={2} sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ListTeams />
                <WheelSpinning/>
            </Stack>
        </AppView>
    );
}

function CalculateWheelSize() {
    return window.innerWidth / 3;
}
const screenWidth = CalculateWheelSize();
console.log(screenWidth)

function WheelSpinning() {
    const handleSpinFinish = (result: string) => {
        console.log(`Spun to: ${result}`);
    };

    const spinWheelProps: ISpinWheelProps = {
        segments,
        onFinished: handleSpinFinish,
        primaryColor: 'black',
        contrastColor: 'white',
        buttonText: 'Spin',
        isOnlyOnce: false,
        size: screenWidth,
        upDuration: 100,
        downDuration: 600,
        fontFamily: 'Arial',
        arrowLocation: 'top',
        showTextOnSpin: false,
        isSpinSound: true,
    };

    return <SpinWheel {...spinWheelProps} />;
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
                .join(',') ?? ''
    });
    
    members.forEach(member => {
        console.log(member.username)
    })

	if (!members) {
		return <Typography>No members found</Typography>
	}
        
}
function ListTeams() {
    return (

        <Container>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={age}
                label="Age"
                //onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
        </Container>
    )
}

export default WheelView;
