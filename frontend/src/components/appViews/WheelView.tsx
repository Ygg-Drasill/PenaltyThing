import { Button, Container, FormControl, InputLabel, MenuItem, Link as MuiLink, Select, Stack, Typography } from '@mui/material';
import { SetStateAction } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { ISpinWheelProps, SpinWheel } from 'spin-wheel-game';
import { cookies } from '../../App';
import { PenaltyThingTheme } from '../../theme';
import useAppContext from '../hooks/appContext';
import { Team } from '../openapi/requests';
import AppView from './AppView';

const segments = [
  { segmentText: 'Option 1', segColor: 'red' },
  { segmentText: 'Option 2', segColor: 'blue' },
  { segmentText: 'Option 3', segColor: 'green' },
];

function WheelView() {
  const appContext = useAppContext();

  return (
    <AppView title={'Spinning Wheel'}>
      <Stack
        direction={'column'}
        gap={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          backgroundColor: PenaltyThingTheme.palette.background.default,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <ListTeams />
        <WheelSpinning />
      </Stack>
    </AppView>
  );
}

function CalculateWheelSize() {
  return window.innerWidth / 5;
}

const screenWidth = CalculateWheelSize();
console.log(screenWidth);

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

function TeamListItem(props: { team: Team; setTeamId: React.Dispatch<SetStateAction<string>> }) {
  const navigate = useNavigate();
  const teamOnClick = () => {
    cookies.set('teamId', props.team.id ?? '');
    props.setTeamId(props.team.id ?? '');
    navigate('/app/team');
  };

  return (
    <MuiLink component={RouterLink} to={'/app/team'} draggable={false}>
      <Button onClick={teamOnClick} fullWidth sx={{ justifyContent: 'start', textTransform: 'none' }}>
        <Typography sx={{ color: PenaltyThingTheme.palette.text.primary }}>
          {props.team.name ?? 'name not found'}
        </Typography>
      </Button>
    </MuiLink>
  );
}

function ListTeams() {
  const appContext = useAppContext();

  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="getTeam">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          {appContext.teams.data && appContext.teams.data.length > 0 ? (
            appContext.teams.data.map(team => (
              <MenuItem key={team.id}>
                {team.name}
              </MenuItem>
            ))
          ) : (
            <Typography>No teams available.</Typography>
          )}
        </Select>
      </FormControl>
    </Container>
  );
}

export default WheelView;
