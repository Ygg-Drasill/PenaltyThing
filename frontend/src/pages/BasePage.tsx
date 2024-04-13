import { Container } from "@mui/material";
import { ReactNode } from "react";

interface BasePageProps {
    children: ReactNode
}

export default function BasePage(props: BasePageProps) {
    return <Container>
        {props.children}
    </Container>
}