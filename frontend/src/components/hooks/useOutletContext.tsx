import { useOutletContext } from "react-router-dom";
import { Member } from "../openapi/requests";

type AppViewOutletContext = { user: Member | null };

export function useAppViewOutletContext() {
    return useOutletContext<AppViewOutletContext>();
}