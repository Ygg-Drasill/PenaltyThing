import { createContext, SetStateAction, useContext } from "react";
import { UserPublic, Team } from "../openapi/requests";

type AppContext = {
    user: UserPublic,
    teams: Team[],
    currentTeamId: string,
    setCurrentTeamId: React.Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<AppContext | undefined>(undefined);

export default function useAppContext() {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error("AppContext can only be used within an AppContext tree")
    }

    return context
}