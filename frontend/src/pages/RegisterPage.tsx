import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import BasePage from "./BasePage";
import { useUserServiceRegisterUser } from "../components/openapi/queries";
import { useState } from "react";
import { AnnouncementSharp } from "@mui/icons-material";

export default function RegisterPage() {
    const registerUserMutation = useUserServiceRegisterUser();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const submitHandler = (event: SubmitEvent) => {
        event.preventDefault()
        if (password != passwordConfirm) {
            return
        }

        registerUserMutation.mutate({
            request: {
                name: username,
                password: password,
            }
        })
    }

    return (
        <BasePage>
            <Card>
                <CardContent>
                    <Box component="form" noValidate autoComplete="off" onSubmit={submitHandler}>
                        <Stack gap={4}>
                            <Stack direction="row" justifyContent="space-between" gap={4}>
                                <TextField fullWidth id="firstname" label="First name" variant="outlined" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}></TextField>
                                <TextField fullWidth id="lastname" label="Last name" variant="outlined" value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)}></TextField>
                            </Stack>
                            <TextField required id="name" label="Username" variant="outlined"
                                onChange={(e) => setUsername(e.target.value)}></TextField>
                            <TextField required id="password" label="Password" variant="outlined" type="password"
                                onChange={(e) => setPassword(e.target.value)}></TextField>
                            <TextField required id="password-confirm" label="Confirm password" variant="outlined" type="password"
                                onChange={(e) => setPasswordConfirm(e.target.value)}></TextField>
                            <Stack direction={"row"} justifyContent={"center"} gap={2}>
                                <Button type="submit" color="success" variant="outlined">Register</Button>
                                <Box alignItems={"flex-start"}>
                                    <Typography textAlign={"left"} variant="subtitle1" sx={{color: "warning.main"}}>
                                        <AnnouncementSharp sx={{marginRight: 1}}/>
                                        Warning: This site is still under development, we do not guarantee security.
                                    </Typography>
                                    <Typography textAlign={"left"} variant="subtitle2" sx={{color: "warning.dark"}}>
                                        Please do not use your real password, we recommend generating one using your password manager.
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </BasePage>
    )
}