import "./App.css";

import { Navigate, Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Stack, Typography } from "@mui/material";
import AppTray from "./components/AppTray";
import HomeView from "./components/appViews/HomeView";
import AppView from "./components/appViews/AppView";
import PenaltiesView from "./components/appViews/PenaltiesView";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import TeamView from "./components/appViews/TeamView";
import { useTeamServiceGetTeamsByUserId, useUserServiceGetUserKey } from "./components/openapi/queries";
import TeamCreatePage from "./components/appViews/teamPages/TeamCreatePage";
import TeamJoinPage from "./components/appViews/teamPages/TeamJoinPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppContext } from "./components/hooks/appContext";
import { OpenAPI, UserService } from "./components/openapi/requests";
import { useQuery } from "@tanstack/react-query";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="app" element={<InnerApp />}>
            <Route path="home" element={<HomeView />} />
            <Route path="penalties" element={<PenaltiesView />} />
            <Route path="team" element={<TeamView />}>
              <Route path="create" element={<TeamCreatePage />} />
              <Route path="join" element={<TeamJoinPage />} />
              <Route path="scoreboard" element={<TeamCreatePage />} />
            </Route>
            <Route path="*" element={<NoView />} />
          </Route>
          <Route path="*" element={<Navigate replace to={"/app/home"}/>} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

function InnerApp() { //TODO: Introduce userSession context where user cookie is passed down to components inside innerApp
  const navigate = useNavigate()
  const [userId, setUserId] = useState("")
  const team = useTeamServiceGetTeamsByUserId({userId: userId})
  
  const {data: user} = useQuery({
    queryKey: [useUserServiceGetUserKey],
    queryFn: () => {
      return UserService.getUser({id: userId})
    },
    enabled: !!userId
  })
  const appContext = {user: user, team: team.data}
  
  useEffect(() => {
    const cookies = new Cookies()
    const userId = cookies.get("userId")
    if (!userId) {
      navigate("/login")
    } else {
      setUserId(userId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider value={appContext}>
      <Stack direction={"row"} height={"100vh"} padding={4} gap={4} boxSizing={"border-box"}>
        <AppTray user={user} isLoading={!!user}/>
        <Outlet context={{user}} />
      </Stack>
    </AppContext.Provider>
  )
}

function NoView() {
  return <AppView title="404">
    <Typography>
      Page does not exist
    </Typography>
  </AppView>
}