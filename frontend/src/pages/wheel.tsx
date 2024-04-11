import { Box, Button, Typography } from "@mui/material";

export function Wheel() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Penalty: kr
      </Typography>
      <Button variant="contained" color="primary">
        Spin the Wheel
      </Button>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Spin the wheel to either pay 0 kr, or pay double.
      </Typography>
    </Box>
  );
}
