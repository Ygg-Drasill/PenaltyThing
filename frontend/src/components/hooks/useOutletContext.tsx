import { useOutletContext } from "react-router-dom";
import { UserPublic } from "../openapi/requests";

type AppViewOutletContext = { user: UserPublic | null };

export function useAppViewOutletContext() {
    return useOutletContext<AppViewOutletContext>();
}