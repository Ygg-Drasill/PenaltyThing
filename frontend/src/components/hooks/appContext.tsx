import { createContext } from "react";
import { Member, Team } from "../openapi/requests";

type AppContext = {
    user: Member | null | undefined,
    team: Team[] | null | undefined,
}

export const AppContext = createContext<AppContext>({
    user: null,
    team: null,
});