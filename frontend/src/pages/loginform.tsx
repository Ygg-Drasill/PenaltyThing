import { Box, Typography } from "@mui/material";

export function LoginForm() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2, // Adds space between each form element
        alignItems: "center", // Centers the items horizontally
        justifyContent: "center", // Adjusts items vertically for better centering
        padding: 4, // Adds padding inside the box, around the elements
        bgcolor: "#686868", // Sets the background color of the box
        borderRadius: 1, // Optionally adds a slight border radius
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optionally adds a shadow for depth
        width: "fit-content", // Adjusts the box width to fit its contents
        margin: "auto", // Centers the box on the page
        mt: "10vh", // Optionally, adjusts the top margin to vertically center the box somewhat
      }}
    >
      <Typography variant="h5">Login</Typography>
      <input
        type="text"
        placeholder="Username"
        style={{ width: "80%", padding: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ width: "80%", padding: "10px" }}
      />
      <button style={{ width: "85%", padding: "10px" }}>Login</button>
    </Box>
  );
}
