import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button, Link, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Navigate, Outlet, Link as RouterLink } from 'react-router-dom';
import AppView from './AppView';

function TeamView() {
  return (
    <AppView title={'Team'} barComponent={<TeamViewNavbar />}>
      <Navigate to='list'></Navigate>
      <Outlet />
    </AppView>
  );
}

function TeamViewNavbar() {
  return (
    <Stack width={'100%'} direction='row' justifyContent={'flex-end'} gap={4}>
      <IconWithText
        path='/app/teams/create'
        icon={<AddCircleIcon />}
        name='Create'
      />
      <IconWithText
        path='/app/teams/join'
        icon={<GroupAddIcon />}
        name='Join'
      />
    </Stack>
  );
}

function IconWithText(props: { path: string; icon: ReactNode; name: string }) {
  return (
    <Link component={RouterLink} to={props.path} draggable={false}>
      <Button>
        {props.icon}
        <Typography sx={{ marginLeft: 0.5 }}>{props.name}</Typography>
      </Button>
    </Link>
  );
}

export default TeamView;
