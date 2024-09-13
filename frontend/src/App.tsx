import "./App.css";

import { Navigate, Outlet, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Stack, Typography } from "@mui/material";
import HomeView from "./components/appViews/HomeView";
import AppView from "./components/appViews/AppView";
import PenaltiesView from "./components/appViews/PenaltiesView";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import TeamView from "./components/appViews/TeamView";
import { useTeamServiceGetTeamsByUserIdKey, useUserServiceGetUserKey } from "./components/openapi/queries";
import TeamCreatePage from "./components/appViews/teamPages/TeamCreatePage";
import TeamJoinPage from "./components/appViews/teamPages/TeamJoinPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TeamService, UserService } from "./components/openapi/requests";
import { useQuery } from "@tanstack/react-query";
import TeamListPage from "./components/appViews/teamPages/TeamListPage";
import TeamLawPage from "./components/appViews/specificTeamPages/TeamLawPage";
import SpecificTeamView from "./components/appViews/SpecificTeamView";
import TeamMemberListPage from "./components/appViews/specificTeamPages/TeamMemberListPage";
import { AppContext } from "./components/hooks/appContext";
import AppTray from "./components/AppTray";

export const cookies = new Cookies()

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
            <Route path="teams" element={<TeamView />}>
              <Route path="create" element={<TeamCreatePage />} />
              <Route path="join" element={<TeamJoinPage />} />
              <Route path="list" element={<TeamListPage />} />
            </Route>
            <Route path="team" element={<SpecificTeamView />} >
              <Route path="laws" element={<TeamLawPage />}/>
              <Route path="" element={<TeamMemberListPage />}/>
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
  const [userId, setUserId] = useState(cookies.get("userId"))
  const [currentTeamId, setCurrentTeamId] = useState(cookies.get("teamId"))

  useEffect(() => {
    console.log("id: " + userId);
  }, [userId])

  useEffect(() => {
    if (!userId) {
      navigate("/login")
    } else {
      setUserId(userId)
    }
    console.log("Updating appContext");
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const {data: user, isLoading: userLoading} = useQuery({
    queryKey: [useUserServiceGetUserKey],
    queryFn: () => {
      return UserService.getUser({id: userId ?? cookies.get("userId")})
    },
    enabled: !!userId,
  })

  const {data: teams} = useQuery({
    queryKey: [useTeamServiceGetTeamsByUserIdKey],
    queryFn: () => {
      return TeamService.getTeamsByUserId({userId: userId ?? cookies.get("userId")})
    },
    enabled: !!userId
  })

  if (!user || !teams) return (
    <Stack direction={"row"} height={"100vh"} padding={4} gap={4} boxSizing={"border-box"}>
        <NoView />
      </Stack>
  )

  return (
    <AppContext.Provider value={{user: user, teams: teams, currentTeamId: currentTeamId, setCurrentTeamId: setCurrentTeamId}}>
      <Stack direction={"row"} height={"100vh"} padding={4} gap={4} boxSizing={"border-box"}>
        <AppTray user={user} isLoading={userLoading}/>
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