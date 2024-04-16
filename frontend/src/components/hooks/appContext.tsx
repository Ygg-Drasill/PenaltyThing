import { createContext } from "react";
import { UserPublic, Team } from "../openapi/requests";

type AppContext = {
    user: UserPublic | null | undefined,
    teams: Team[] | null | undefined,
}

export const AppContext = createContext<AppContext>({
    user: null,
    teams: null,
});