import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { arrayTitleOfBlock, ArrayTitleOfBlockType } from "./data-const.ts";
import { useNavigate } from "react-router-dom";

export const MainDashboard = () => {
    const nav = useNavigate();

    const formatTitleForUrlPath = (title: ArrayTitleOfBlockType) => {
        return title.titleOne.charAt(0).toLowerCase() + title.titleOne.slice(1);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(180deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 6,
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{
                            color: "#94a3b8",
                            letterSpacing: 2,
                            fontSize: "0.9rem",
                        }}
                    >
                        Espace de gestion
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "white",
                            mt: 1,
                            fontSize: { xs: "2rem", md: "3rem" },
                        }}
                    >
                        Votre dashboard
                    </Typography>

                    <Typography
                        sx={{
                            color: "#cbd5e1",
                            maxWidth: 680,
                            mx: "auto",
                            mt: 2,
                            fontSize: "1rem",
                        }}
                    >
                        Retrouvez tous les outils pour gérer votre profil, votre contenu et
                        votre présence en ligne depuis une interface claire et moderne.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    {arrayTitleOfBlock.map((b) => (
                        <Grid item xs={12} sm={10} md={6} key={`${b.titleOne}-${b.titleTwo}`}>
                            <Card
                                sx={{
                                    height: "100%",
                                    minHeight: 500,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    borderRadius: 5,
                                    overflow: "hidden",
                                    background: "rgba(15, 23, 42, 0.82)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
                                    },
                                }}
                            >
                                <Box sx={{ overflow: "hidden" }}>
                                    <CardMedia
                                        component="img"
                                        image={b.imgPath}
                                        alt={b.titleTwo}
                                        sx={{
                                            height: 240,
                                            objectFit: "cover",
                                            transition: "transform 0.5s ease, filter 0.5s ease",
                                            "&:hover": {
                                                transform: "scale(1.04)",
                                                filter: "brightness(0.9)",
                                            },
                                        }}
                                    />
                                </Box>

                                <CardContent sx={{ p: 4 }}>
                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            color: "#38bdf8",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: 1,
                                            mb: 1,
                                        }}
                                        gutterBottom
                                    >
                                        {b.titleOne}
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            color: "white",
                                            fontWeight: 700,
                                            mb: 2,
                                        }}
                                    >
                                        {b.titleTwo}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#cbd5e1",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {b.desc}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ px: 4, pb: 4 }}>
                                    <Button
                                        onClick={() => nav(formatTitleForUrlPath(b))}
                                        variant="contained"
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderRadius: 3,
                                            px: 3,
                                            py: 1.1,
                                            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                                            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
                                        }}
                                    >
                                        {b.btn}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
