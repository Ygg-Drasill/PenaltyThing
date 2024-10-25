import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../../queryClient';
import useAppContext from '../../hooks/appContext';
import { useTeamServiceCreateTeam, useTeamServiceGetTeamsByUserIdKey } from '../../openapi/queries';

function TeamCreatePage() {
    const [teamName, setTeamName] = useState('');
    const createTeamMutation = useTeamServiceCreateTeam();
    const appContext = useAppContext();
    const navigate = useNavigate();

    const handleTeamCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!appContext.user?.data.id) {
            return;
        }
        createTeamMutation.mutate(
            {
                request: {
                    name: teamName,
                    userId: appContext.user.data.id,
                },
            },
            {
                onSuccess: (data) => {
                    const newTeamId = data.id;

                    appContext.setCurrentTeamId(newTeamId);

                    queryClient.invalidateQueries({
                        queryKey: [useTeamServiceGetTeamsByUserIdKey],
                    });

                    navigate(`/app/team`);
                },
            }
        );
    };

    return (
        <Box component={'form'} onSubmit={handleTeamCreateSubmit}>
            <Stack direction={'row'} gap={2}>
                <TextField
                    id='teamName'
                    label='Team name'
                    value={teamName}
                    onChange={e => setTeamName(e.currentTarget.value)}
                />
                <Button type='submit' color='success'>
                    Create {createTeamMutation.isPending && <CircularProgress />}
                </Button>
            </Stack>
        </Box>
    );
}

export default TeamCreatePage;