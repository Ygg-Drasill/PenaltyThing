import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#686868" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rules
        </Typography>
        <Button color="inherit" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
