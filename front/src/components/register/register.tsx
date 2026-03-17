import {useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Card, CardContent, Divider, Grid, Stack, TextField, Typography,} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, {useState} from "react";
import {RegisterObject} from "./type";
import {register} from "./request.ts";

export const Register = () => {
    const nav = useNavigate();

    const [registerObject, setRegisterObject] = useState<RegisterObject>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        avatar: undefined,
    });

    const handleChange =
        (field: keyof RegisterObject) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = field === "avatar" ? e.target.files?.[0] : e.target.value;

                setRegisterObject((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };

    const handleRegister = () => {
        // console.log(registerObject);
        //
        register(registerObject)
          .then(() => nav("/"))
          .catch((error) => {
            console.log("Alert Register");
            console.error(error);
          });
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 6,
            }}
        >
            <Card
                elevation={0}
                sx={{
                    maxWidth: 520,
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <CardContent sx={{p: 4}}>
                    <Stack spacing={3}>
                        <Stack alignItems="center" spacing={1.5}>
                            <Avatar
                                sx={{
                                    bgcolor: "black",
                                    width: 64,
                                    height: 64,
                                }}
                            >
                                <HowToRegIcon fontSize="medium"/>
                            </Avatar>

                            <Box textAlign="center">
                                <Typography variant="h5" fontWeight={700}>
                                    Créer un compte
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rejoins l’application avec un profil complet
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider/>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    variant="outlined"
                                    value={registerObject.firstname}
                                    onChange={handleChange("firstname")}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    value={registerObject.lastname}
                                    onChange={handleChange("lastname")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Adresse email"
                                    type="email"
                                    variant="outlined"
                                    value={registerObject.email}
                                    onChange={handleChange("email")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mot de passe"
                                    type="password"
                                    variant="outlined"
                                    value={registerObject.password}
                                    onChange={handleChange("password")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant="body2" fontWeight={600}>
                                        Avatar
                                    </Typography>

                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<UploadFileIcon/>}
                                        sx={{
                                            justifyContent: "flex-start",
                                            py: 1.5,
                                            borderRadius: 2,
                                            textTransform: "none",
                                        }}
                                    >
                                        {registerObject.avatar
                                            ? registerObject.avatar.name
                                            : "Choisir une image"}
                                        <input
                                            hidden
                                            type="file"
                                            accept="image/*"
                                            onChange={handleChange("avatar")}
                                        />
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Stack spacing={1.5}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleRegister}
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
                                S’inscrire
                            </Button>

                            <Button
                                variant="text"
                                size="small"
                                onClick={() => nav("/login")}
                                sx={{
                                    textTransform: "none",
                                    color: "text.secondary",
                                    fontWeight: 500,
                                }}
                            >
                                Déjà un compte ? Se connecter
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
