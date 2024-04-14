import "./App.css";

import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Stack } from "@mui/material";
import AppTray from "./components/AppTray";
import HomeView from "./components/appViews/HomeView";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="app" element={<InnerApp />}>
          <Route path="home" element={<HomeView />}></Route>
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