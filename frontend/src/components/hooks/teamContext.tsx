import { createContext, useContext } from "react";
import { Team } from "../openapi/requests";

interface TeamContext {
  team: Team;
}

export const TeamContext = createContext<TeamContext | undefined>(undefined);

export default function useTeamContext() {
  const context = useContext(TeamContext);

  if (context === undefined) {
    throw new Error("TeamContext can only be used within an TeamContext tree");
  }

  return context;
}
