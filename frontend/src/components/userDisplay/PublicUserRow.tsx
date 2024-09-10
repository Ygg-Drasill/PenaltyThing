import { Box, Typography } from "@mui/material";
import { UserPublic } from "../openapi/requests";

interface PublicUserRowProps {
    user: UserPublic
}

export default function PublicUserRow(props: PublicUserRowProps) {
    return (
        <Box padding={2} borderRadius={1} bgcolor={"primary.dark"}>
            <Typography>{props.user.firstName} {props.user.lastName}</Typography>
        </Box>
    )
}