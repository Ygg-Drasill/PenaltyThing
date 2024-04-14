import "./App.css";

import { Navigate, Outlet, redirect, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Stack, Typography } from "@mui/material";
import AppTray from "./components/AppTray";
import HomeView from "./components/appViews/HomeView";
import AppView from "./components/appViews/AppView";
import PenaltiesView from "./components/appViews/PenaltiesView";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import TeamsView from "./components/appViews/TeamsView";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="app" element={<InnerApp />}>
          <Route path="home" element={<HomeView />} />
          <Route path="penalties" element={<PenaltiesView />} />
          <Route path="teams" element={<TeamsView />} />
          <Route path="*" element={<NoView />} />
        </Route>
        <Route path="*" element={<Navigate replace to={"/app/home"}/>} />
      </Routes>
    </Router>
  );
}

export default App;

function InnerApp() { //TODO: Introduce userSession context where user cookie is passed down to components inside innerApp
  const navigate = useNavigate()
  useEffect(() => {
    const cookies = new Cookies()
    if (!cookies.get("userId")) {
      navigate("/login")
    }
  })

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