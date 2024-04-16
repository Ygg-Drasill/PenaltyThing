import { useOutletContext } from "react-router-dom";
import { Member, Team } from "../openapi/requests";

type TeamPageOutletContext = { user: Member | null, team: Team | null };

export function useTeamPageOutletContext() {
    return useOutletContext<TeamPageOutletContext>();
}