import { Container } from "@mui/material";
import { ReactNode } from "react";

interface BasePageProps {
    children: ReactNode
}

export default function BasePage(props: BasePageProps) {
    return <Container sx={{
            height: "100vh", 
            alignItems: "center", 
            justifyContent: "center",
            paddingTop: "10vh" 
        }}>
        {props.children}
    </Container>
}