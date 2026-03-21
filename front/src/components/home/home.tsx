import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const homeSection1 = "src/assets/home_section_1.png";
const homeSection2 = "src/assets/home_section_2.jpg";

export const Home = () => {
  return (
      <Box
          sx={{
            minHeight: "100vh",
            background:
                "linear-gradient(180deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
            color: "white",
            py: 8,
          }}
      >
        <Container maxWidth="lg">
          <Stack spacing={8}>
            <Box
                sx={{
                  textAlign: "center",
                  py: { xs: 4, md: 8 },
                }}
            >
              <Typography
                  variant="overline"
                  sx={{
                    color: "#94a3b8",
                    letterSpacing: 2,
                    fontSize: "0.85rem",
                  }}
              >
                Votre présence en ligne, simplifiée
              </Typography>

              <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mt: 2,
                    mb: 2,
                    fontSize: { xs: "2.2rem", md: "4rem" },
                    lineHeight: 1.1,
                  }}
              >
                Créez une page unique
                <Box
                    component="span"
                    sx={{
                      display: "block",
                      background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                >
                  pour tous vos liens
                </Box>
              </Typography>

              <Typography
                  variant="body1"
                  sx={{
                    maxWidth: 700,
                    mx: "auto",
                    color: "#cbd5e1",
                    fontSize: "1.1rem",
                    mb: 4,
                  }}
              >
                Link Tree vous permet de regrouper vos réseaux, contenus et projets
                sur une seule page moderne, accessible et gratuite.
              </Typography>

              <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
              >
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                >
                  Commencer maintenant
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      borderColor: "#475569",
                      color: "white",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                >
                  Découvrir la plateforme
                </Button>
              </Stack>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card
                    sx={{
                      height: "100%",
                      minHeight: 520,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 5,
                      overflow: "hidden",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                    }}
                >
                  <CardMedia
                      component="img"
                      image={homeSection1}
                      alt="Présentation des fonctionnalités"
                      sx={{
                        height: 260,
                        objectFit: "cover",
                      }}
                  />

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
                      Fonctionnalités
                    </Typography>

                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          mb: 2,
                        }}
                    >
                      Découvrez notre plateforme
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                          color: "#cbd5e1",
                          lineHeight: 1.8,
                        }}
                    >
                      Centralisez vos liens, vos contenus et votre univers sur une
                      page claire, élégante et facile à partager avec votre audience.
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: 4, pb: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                          borderRadius: 3,
                          px: 3,
                          textTransform: "none",
                          fontWeight: 700,
                          background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
                        }}
                    >
                      Découvrir les fonctionnalités
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                    sx={{
                      height: "100%",
                      minHeight: 520,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 5,
                      overflow: "hidden",
                      background: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                    }}
                >
                  <CardMedia
                      component="img"
                      image={homeSection2}
                      alt="Développez votre audience"
                      sx={{
                        height: 260,
                        objectFit: "cover",
                      }}
                  />

                  <CardContent sx={{ p: 4 }}>
                    <Typography
                        sx={{
                          fontSize: 14,
                          color: "#a78bfa",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          mb: 1,
                        }}
                        gutterBottom
                    >
                      Réseau & visibilité
                    </Typography>

                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          mb: 2,
                        }}
                    >
                      Augmentez votre audience
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                          color: "#cbd5e1",
                          lineHeight: 1.8,
                        }}
                    >
                      Reliez votre contenu à votre communauté et facilitez l’accès à
                      vos plateformes, vos créations et vos actualités.
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: 4, pb: 4 }}>
                    <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 3,
                          px: 3,
                          textTransform: "none",
                          fontWeight: 700,
                          color: "white",
                          borderColor: "#64748b",
                        }}
                    >
                      Consulter
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
  );
};
