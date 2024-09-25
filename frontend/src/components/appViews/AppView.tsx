import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

function AppView(props: {
  title: string;
  children: ReactNode;
  barComponent?: ReactNode;
}) {
  return (
    <Paper
      sx={{
        backgroundColor: "background.default",
        flexGrow: 1,
        padding: 4,
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6" color={"secondary"}>
          {props.title}
        </Typography>
        {props.barComponent}
      </Stack>
      <Divider />
      {props.children}
    </Paper>
  );
}

export default AppView;
