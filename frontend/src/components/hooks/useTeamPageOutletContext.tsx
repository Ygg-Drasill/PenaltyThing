import { useOutletContext } from "react-router-dom";
import { Member, Team } from "../openapi/requests";

type TeamPageOutletContext = { user: Member | null, team: Team };

export function useTeamPageOutletContext() {
    return useOutletContext<TeamPageOutletContext>();
}