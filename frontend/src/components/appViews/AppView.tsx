import { Divider, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface BaseAppViewProps {
  userId: string
}

function AppView(props: { title: string; children: ReactNode }) {
  return (
    <Paper
      sx={{
        backgroundColor: "background.default",
        flexGrow: 1,
        padding: "2rem",
      }}
    >
      <Typography variant="h4" color={"secondary"}>
        {props.title}
      </Typography>
      <Divider />
      {props.children}
    </Paper>
  );
}

export default AppView;
