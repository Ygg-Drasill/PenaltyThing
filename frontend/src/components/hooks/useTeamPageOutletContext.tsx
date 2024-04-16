import { useOutletContext } from "react-router-dom";
import { Team, UserPublic } from "../openapi/requests";

type TeamPageOutletContext = { user: UserPublic | null, team: Team | null };

export function useTeamPageOutletContext() {
    return useOutletContext<TeamPageOutletContext>();
}