import "./App.css";

import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Stack, Typography } from "@mui/material";
import AppTray from "./components/AppTray";
import HomeView from "./components/appViews/HomeView";
import AppView from "./components/appViews/AppView";
import PenaltiesView from "./components/appViews/PenaltiesView";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="app" element={<InnerApp />}>
          <Route path="home" element={<HomeView />} />
          <Route path="penalties" element={<PenaltiesView />} />
          <Route path="*" element={<NoView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

function InnerApp() {

  return (
    <Stack direction={"row"} height={"100vh"} padding={4} gap={4} boxSizing={"border-box"}>
      <AppTray />
      <Outlet />
    </Stack>
  )
}

function NoView() {
  return <AppView title="404">
    <Typography>
      Page does not exist
    </Typography>
  </AppView>
}