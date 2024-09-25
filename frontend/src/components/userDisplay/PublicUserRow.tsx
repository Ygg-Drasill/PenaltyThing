import { Stack, Typography } from "@mui/material";
import { UserPublic } from "../openapi/requests";

interface PublicUserRowProps {
  user: UserPublic;
  actionButton?: React.ReactNode;
}

export default function PublicUserRow(props: PublicUserRowProps) {
  return (
    <Stack
      padding={2}
      borderRadius={1}
      border={"1px solid"}
      borderColor={"primary.main"}
      direction={"row"}
      justifyContent={"space-between"}
    >
      <Typography variant="h5" alignContent={"center"}>
        {props.user.username}
      </Typography>
      {props.actionButton}
    </Stack>
  );
}
