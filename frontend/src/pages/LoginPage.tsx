import { Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./BasePage";

export default function LoginPage() {

    return (
        <BasePage>
            <Card>
                <CardContent>
                    <Box component="form" noValidate autoComplete="off">
                        <Stack gap={2}>
                            <TextField required id="name" label="Username" variant="outlined"></TextField>
                            <TextField required id="password" label="Password" variant="outlined" type="password"></TextField>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </BasePage>
    )
}