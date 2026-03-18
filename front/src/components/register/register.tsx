import {useNavigate} from "react-router-dom";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {ChangeEvent, useState} from "react";
import {RegisterObject} from "./type";
import {register} from "./request.ts";
import {initRegisterObject} from "./const.ts";
import {AlertObject} from "../common/types.ts";

type RegisterErrors = Partial<Record<keyof RegisterObject | "confirmPassword", string>>;

export const Register = () => {
    const nav = useNavigate();

    const [registerObject, setRegisterObject] = useState<RegisterObject>(initRegisterObject);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<RegisterErrors>({});
    const [alert, setAlert] = useState<AlertObject>({
        isVisible: false,
        type: "warning",
        message: "",
    });

    const handleChange = (field: keyof RegisterObject) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = field === "avatar" ? e.target.files?.[0] : e.target.value;
        setRegisterObject((prev) => ({...prev, [field]: value,}));
        setErrors((prev) => ({...prev, [field]: "",}));
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setErrors((prev) => ({...prev, confirmPassword: "",}));
    };

    const validateEmail = (email: string): boolean => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: RegisterErrors = {};

        if (!registerObject.firstname.trim()) newErrors.firstname = "Le prénom est requis";

        if (!registerObject.lastname.trim()) newErrors.lastname = "Le nom est requis";

        if (!registerObject.email.trim()) {
            newErrors.email = "L'adresse email est requise";
        } else if (!validateEmail(registerObject.email)) {
            newErrors.email = "Le format de l'email est incorrect";
        }

        if (!registerObject.password.trim()) newErrors.password = "Le mot de passe est requis";

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise";
        } else if (registerObject.password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe sont différents";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        setAlert({isVisible: false, type: "error", message: ""});
        setErrors({});

        const fieldsAreValid = validateForm();

        if (!fieldsAreValid) {
            return;
        }

        try {
            await register(registerObject);
            nav("/");
        } catch (error: any) {
            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Une erreur est apparue lors de votre inscription";

            setAlert({
                isVisible: true,
                type: "error",
                message: Array.isArray(backendMessage)
                    ? backendMessage.join(", ")
                    : backendMessage,
            });

            console.error("Erreur inscription :", error);
        }
    };

    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: 6}}>
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
                    {alert.isVisible && <Alert severity={alert.type}>{alert.message}</Alert>}

                    <Stack spacing={3}>
                        <Stack alignItems="center" spacing={1.5}>
                            <Avatar sx={{bgcolor: "black", width: 64, height: 64}}>
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
                                    error={!!errors.firstname}
                                    helperText={errors.firstname}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    value={registerObject.lastname}
                                    onChange={handleChange("lastname")}
                                    error={!!errors.lastname}
                                    helperText={errors.lastname}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
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
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirmer mot de passe"
                                    type="password"
                                    variant="outlined"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
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
