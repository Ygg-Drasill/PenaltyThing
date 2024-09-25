import {
  Autocomplete,
  Box,
  Button,
  Divider,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ModalBase } from "./ModalBase";
import {
  useInvitationServiceCreateInvitation,
  UserServiceGetUserAllQueryResult,
  useUserServiceGetUserAll,
} from "../openapi/queries";
import { User, UserPublic, UserService } from "../openapi/requests";
import { useEffect, useState } from "react";
import { all } from "axios";
import useAppContext from "../hooks/appContext";
import { Send } from "@mui/icons-material";
import useTeamContext from "../hooks/teamContext";

interface InviteUserModalProps {
  open: boolean;
  onClose: Function;
}

export default function InviteUserModal(props: InviteUserModalProps) {
  const { data: allUsers, isLoading } = useUserServiceGetUserAll();
  const inviteMutation = useInvitationServiceCreateInvitation();
  const [selectedUser, setSelectedUser] = useState<User>();
  const appContext = useAppContext();
  const teamContext = useTeamContext();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    inviteMutation.mutate({
      request: {
        senderUserId: appContext.user.data.id,
        targetUserId: selectedUser.id,
        teamId: teamContext.team.id,
      },
    });

    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={() => props.onClose()}>
      <Box component={"form"} sx={ModalBase} onSubmit={onSubmit}>
        <Typography variant="h5">Invite user to team</Typography>
        <Divider />
        {isLoading || !allUsers ? (
          <LinearProgress />
        ) : (
          <Autocomplete
            options={allUsers}
            getOptionLabel={(user: UserPublic) =>
              user.username ?? "Unknown user"
            }
            renderInput={(params) => <TextField {...params} label={"User"} />}
            onChange={(_, user) => setSelectedUser(user)}
          />
        )}
        <Button type="submit">
          <Send /> Invite
        </Button>
      </Box>
    </Modal>
  );
}
