import {Avatar, Box, Button, Card, CardContent, Divider, Stack, TextField, Typography,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {setRoleOnLogin, setUserLightInfoOnLogin} from "../../features/authentication/auth-slice.ts";
import {login} from "./request.ts";
import {LoginObject} from "./type.ts";
import {initLoginObject} from "./const.ts";

export const Login = () => {
    const [loginObject, setLoginObject] = useState<LoginObject>(initLoginObject);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleChange =
        (field: keyof LoginObject) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                setLoginObject((prev) => ({...prev, [field]: e.target.value}));
            };

    const handleLogin = () => {
        login(loginObject)
            .then((data) => {
                dispatch(setRoleOnLogin(data.accessToken));
                dispatch(setUserLightInfoOnLogin(data.lightInfo));
                if (data.accessToken) nav("/");
            })
            .catch((error) => {
                console.log("Alert login");
                console.error(error);
            });
    };

    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", px: 2}}>
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 460,
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.06)",
                }}
            >
                <CardContent sx={{p: 4}}>
                    <Stack spacing={3}>
                        <Stack alignItems="center" spacing={1.5}>
                            <Avatar sx={{bgcolor: "black", width: 64, height: 64}}>
                                <LoginIcon fontSize="medium"/>
                            </Avatar>

                            <Box textAlign="center">
                                <Typography variant="h5" fontWeight={700}>
                                    Connexion
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Connecte-toi pour accéder à ton espace
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider/>

                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Adresse email"
                                type="email"
                                variant="outlined"
                                value={loginObject.email}
                                onChange={handleChange("email")}
                            />

                            <TextField
                                fullWidth
                                label="Mot de passe"
                                type="password"
                                variant="outlined"
                                value={loginObject.password}
                                onChange={handleChange("password")}
                            />
                        </Stack>

                        <Stack spacing={1.5}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleLogin}
                                sx={{
                                    bgcolor: "black",
                                    color: "white",
                                    py: 1.4,
                                    borderRadius: 2.5,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: "none",
                                    "&:hover": {
                                        bgcolor: "#222",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                Se connecter
                            </Button>

                            <Button
                                variant="text"
                                size="small"
                                onClick={() => nav("/register")}
                                sx={{
                                    textTransform: "none",
                                    color: "text.secondary",
                                    fontWeight: 500,
                                }}
                            >
                                Pas encore de compte ? S’inscrire
                            </Button>

                            <Button
                                variant="text"
                                size="small"
                                startIcon={<KeyboardBackspaceIcon/>}
                                onClick={() => nav("/")}
                                sx={{
                                    textTransform: "none",
                                    color: "black",
                                    alignSelf: "center",
                                }}
                            >
                                Retour à l’accueil
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};
