import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {useEffect, useState} from "react";
import {createPathProfile, getOwnerInfos, updateAllBranchs, updatePathProfil} from "./request.ts";
// import AddIcon from '@mui/icons-material/Add';
import {Box, Button, Card, CardContent, Container, Grid, Stack, TextField, Typography} from "@mui/material";
import {BranchsPartialType, PathPartialType, PathType} from "../../common/types.ts";
import CreateIcon from '@mui/icons-material/Create';
import {MuiColorInput} from "mui-color-input";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {formatUrlToTitle} from "./format-text.ts";
import {ColorBgModify} from "./components/color-bg-modify.tsx";
import {AvatarFieldsModify} from "./components/avatar-fields-modify.tsx";
import {PathProfilModify} from "./components/path-profil-modify.tsx";
import {BioProfilModify} from "./components/bio-profil-modify.tsx";
import {GenericCreateFields} from "./components/generic-create-fields-props.tsx";
// TODO: Separer dans des composant
// TODO:Ajouter une ligne de link avec un boutton

export const Modification = () => {

    const userId = useSelector((state: RootState) => state.authentication.userId)
    const [pathWithNestedBranchs, setPathWithNestedBranchs] = useState<PathType>();

    const [modifyBgColor, setModifyBgColor] = useState<boolean>(false)
    const [modifyInfoFields, setModifyInfoFields] = useState<boolean>(false)
    const [modifyLinksFields, setModifyLinksFields] = useState<boolean>(false)

    const [isCreateTree, setIsCreateTree] = useState<boolean>(false)
    const [pathToCreate, setPathToCreate] = useState<string>("")
    const [bioToCreate, setBioToCreate] = useState<string>("")
    const [bgColorToCreate, setBgColorToCreate] = useState<string>("")
    const [branchToCreate, setBranchToCreate] = useState<BranchsPartialType>({url_network: "", name_network: ""})

    // HANDLE CLOSE

    const handleCloseInfoFields = () => {
        setModifyInfoFields(false)
        handleRefreshPage()
    }

    const handleCloseLinksFields = () => {
        setModifyLinksFields(false)
        handleRefreshPage()
    }

    const handleCloseColorPicker = () => {
        setModifyBgColor(false)
        handleRefreshPage()
    }

    const setAllToFalse = () => {
        setModifyInfoFields(false)
        setModifyBgColor(false)
        setModifyLinksFields(false)
    }

    // HANDLE UPDATE

    const handleValidateBg = () => {
        console.log(pathWithNestedBranchs)
        updatePathProfil(pathWithNestedBranchs!.id!, pathWithNestedBranchs!)
            .then((d) => console.log(d))
            .catch((e) => console.log(e))
        setAllToFalse()
    }

    const handleValidateLinks = () => {
        updateAllBranchs(pathWithNestedBranchs!.id!, pathWithNestedBranchs!)
            .then((d) => console.log(d))
            .catch((e) => console.log(e))
        setAllToFalse()
    }

    const handleValidateInfo = () => {
        updatePathProfil(pathWithNestedBranchs!.id!, pathWithNestedBranchs!)
            .then((d) => console.log(d))
            .catch((e) => console.log(e))
        setAllToFalse()
    }

    // Handle Add

    // const handleAddLinks = () => {
    //   setPathWithNestedBranchs(prevState => {
    //     if (prevState) {
    //       return {
    //         ...prevState,
    //         ...prevState.branchs.push({url_network: "", name_network: "", id: "", createdAt:"", pathId: prevState.id, updatedAt: ""})
    //       };
    //     }
    //   });
    // }

    // REFRESH

    const handleRefreshPage = () => {
        getOwnerInfos(userId!)
            .then(setPathWithNestedBranchs)
            .catch((error) => {
                console.log("Error get owner info");
                console.error(error);
            });
    }

    // Handle Modify

    const handleModifyBgColor = (newValue: string) => {
        setPathWithNestedBranchs(prevState => {
            if (prevState) {
                return {
                    ...prevState,
                    bgColor: newValue,
                };
            }
        });
    };


    const handleBranchChange = (id: number, newValue: string) => {
        setPathWithNestedBranchs((prevState) => {
            if (prevState) {
                return {
                    ...prevState,
                    branchs: prevState.branchs.map((branch) =>
                        branch.id === id ? {...branch, name_network: newValue} : branch
                    ),
                };
            }
        });
    };

    //  HANDLE CREATE

    const handleCreateBgColor = (newValue: string) => {
        setBgColorToCreate(newValue);
    };

    const handleCreatePath = () => {
        const newPath: PathPartialType = {
            bio: bioToCreate,
            url_owner: "/" + pathToCreate,
            bgColor: bgColorToCreate,
            userId: userId!,
            branchs: [{name_network: branchToCreate.url_network, url_network: branchToCreate.url_network}],
        }
        createPathProfile(newPath).then((res) =>
            console.log(res)
        )
    }

    // UseEffect

    useEffect(() => {
        handleRefreshPage()
    }, [userId]);


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
                {!pathWithNestedBranchs ? (
                    <Card
                        sx={{
                            maxWidth: 900,
                            mx: "auto",
                            borderRadius: 5,
                            background: "rgba(15, 23, 42, 0.82)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                            color: "white",
                        }}
                    >
                        <CardContent sx={{p: {xs: 3, md: 6}, textAlign: "center"}}>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: "#94a3b8",
                                    letterSpacing: 2,
                                    fontSize: "0.9rem",
                                }}
                            >
                                Création de profil
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mt: 1,
                                    mb: 2,
                                    fontSize: {xs: "2rem", md: "2.8rem"},
                                }}
                            >
                                Vous n’avez pas encore de Tree
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#cbd5e1",
                                    maxWidth: 620,
                                    mx: "auto",
                                    mb: 4,
                                }}
                            >
                                Créez votre espace personnalisé pour regrouper vos liens, votre bio
                                et vos réseaux sur une seule page élégante.
                            </Typography>

                            {!isCreateTree ? (
                                <Button
                                    variant="contained"
                                    onClick={() => setIsCreateTree(true)}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: 3,
                                        px: 4,
                                        py: 1.4,
                                        background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                                        boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
                                    }}
                                >
                                    Créer votre Tree
                                </Button>
                            ) : (
                                <Box sx={{mt: 5}}>
                                    <Grid container spacing={3} justifyContent="center">
                                        <Grid item xs={12} md={8}>
                                            <TextField
                                                fullWidth
                                                InputLabelProps={{shrink: true}}
                                                label="Url"
                                                value={pathToCreate}
                                                variant="outlined"
                                                onChange={(e) => setPathToCreate(e.target.value)}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: 3,
                                                        backgroundColor: "rgba(255,255,255,0.03)",
                                                        color: "white",
                                                    },
                                                    "& .MuiInputLabel-root": {color: "#cbd5e1"},
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <TextField
                                                fullWidth
                                                InputLabelProps={{shrink: true}}
                                                label="Votre bio"
                                                value={bioToCreate}
                                                variant="outlined"
                                                onChange={(e) => setBioToCreate(e.target.value)}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: 3,
                                                        backgroundColor: "rgba(255,255,255,0.03)",
                                                        color: "white",
                                                    },
                                                    "& .MuiInputLabel-root": {color: "#cbd5e1"},
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Typography
                                                sx={{
                                                    color: "white",
                                                    fontWeight: 700,
                                                    mb: 1.5,
                                                    textAlign: "left",
                                                }}
                                            >
                                                Choisissez une couleur de fond
                                            </Typography>

                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: "rgba(255,255,255,0.03)",
                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                }}
                                            >
                                                <MuiColorInput
                                                    format="hex"
                                                    value={bgColorToCreate}
                                                    onChange={handleCreateBgColor}
                                                    fullWidth
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Typography
                                                sx={{
                                                    color: "white",
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    textAlign: "left",
                                                }}
                                            >
                                                Vos réseaux
                                            </Typography>

                                            <Stack spacing={2}>
                                                <GenericCreateFields
                                                    setBranchToCreate={setBranchToCreate}
                                                    keyParam="name_network"
                                                    value={branchToCreate?.name_network}
                                                />
                                                <GenericCreateFields
                                                    setBranchToCreate={setBranchToCreate}
                                                    keyParam="url_network"
                                                    value={branchToCreate?.url_network}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="center"
                                        sx={{mt: 4}}
                                    >
                                        <Button
                                            onClick={handleCreatePath}
                                            variant="contained"
                                            sx={{
                                                minWidth: 52,
                                                borderRadius: 3,
                                                background: "linear-gradient(90deg, #22c55e, #16a34a)",
                                            }}
                                        >
                                            <DoneIcon/>
                                        </Button>

                                        <Button
                                            onClick={() => setIsCreateTree(false)}
                                            variant="outlined"
                                            sx={{
                                                minWidth: 52,
                                                borderRadius: 3,
                                                color: "white",
                                                borderColor: "rgba(255,255,255,0.18)",
                                            }}
                                        >
                                            <CloseIcon/>
                                        </Button>
                                    </Stack>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Box sx={{mt: 4}}>
                        <Box sx={{textAlign: "center", mb: 5}}>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: "#94a3b8",
                                    letterSpacing: 2,
                                    fontSize: "0.9rem",
                                }}
                            >
                                Gestion du profil
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: "white",
                                    mt: 1,
                                    fontSize: {xs: "2rem", md: "2.8rem"},
                                }}
                            >
                                Voici votre Tree actuel
                            </Typography>
                        </Box>

                        {modifyBgColor && (
                            <ColorBgModify
                                pathWithNestedBranchs={pathWithNestedBranchs}
                                handleModifyBgColor={handleModifyBgColor}
                                handleValidateBg={handleValidateBg}
                                handleCloseColorPicker={handleCloseColorPicker}
                            />
                        )}

                        <Card
                            sx={{
                                width: {xs: "100%", md: "85%"},
                                mx: "auto",
                                borderRadius: 5,
                                background: "rgba(15, 23, 42, 0.82)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: pathWithNestedBranchs?.bgColor || "#111827",
                                    p: {xs: 3, md: 6},
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                <Box display="flex" justifyContent="flex-end" mb={3}>
                                    <Button
                                        onClick={() => setModifyBgColor(!modifyBgColor)}
                                        variant="contained"
                                        sx={{
                                            minWidth: 48,
                                            borderRadius: 3,
                                            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                                        }}
                                    >
                                        <CreateIcon/>
                                    </Button>
                                </Box>

                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <AvatarFieldsModify/>

                                    {modifyInfoFields ? (
                                        <Box sx={{width: "100%", maxWidth: 700, mt: 4}}>
                                            <Card
                                                sx={{
                                                    borderRadius: 4,
                                                    background: "rgba(255,255,255,0.08)",
                                                    backdropFilter: "blur(8px)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    p: 3,
                                                }}
                                            >
                                                <PathProfilModify
                                                    pathWithNestedBranchs={pathWithNestedBranchs}
                                                    setPathWithNestedBranchs={setPathWithNestedBranchs}
                                                />

                                                <Box sx={{mt: 3}}>
                                                    <BioProfilModify
                                                        pathWithNestedBranchs={pathWithNestedBranchs}
                                                        setPathWithNestedBranchs={setPathWithNestedBranchs}
                                                    />
                                                </Box>

                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    justifyContent="center"
                                                    sx={{mt: 4}}
                                                >
                                                    <Button
                                                        onClick={handleValidateInfo}
                                                        variant="contained"
                                                        sx={{
                                                            minWidth: 52,
                                                            borderRadius: 3,
                                                            background:
                                                                "linear-gradient(90deg, #22c55e, #16a34a)",
                                                        }}
                                                    >
                                                        <DoneIcon/>
                                                    </Button>

                                                    <Button
                                                        onClick={handleCloseInfoFields}
                                                        variant="outlined"
                                                        sx={{
                                                            minWidth: 52,
                                                            borderRadius: 3,
                                                            color: "white",
                                                            borderColor: "rgba(255,255,255,0.18)",
                                                        }}
                                                    >
                                                        <CloseIcon/>
                                                    </Button>
                                                </Stack>
                                            </Card>
                                        </Box>
                                    ) : (
                                        <Box sx={{textAlign: "center", mt: 4}}>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: "white",
                                                    fontSize: {xs: "2rem", md: "3rem"},
                                                }}
                                            >
                                                {formatUrlToTitle(pathWithNestedBranchs?.url_owner)}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#e2e8f0",
                                                    mt: 2,
                                                    maxWidth: 640,
                                                    mx: "auto",
                                                    lineHeight: 1.8,
                                                }}
                                            >
                                                {pathWithNestedBranchs?.bio}
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>

                                <Box display="flex" justifyContent="flex-end" mt={4}>
                                    <Button
                                        onClick={() => setModifyInfoFields(!modifyInfoFields)}
                                        variant="contained"
                                        sx={{
                                            minWidth: 48,
                                            borderRadius: 3,
                                            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                                        }}
                                    >
                                        <CreateIcon/>
                                    </Button>
                                </Box>

                                {modifyLinksFields ? (
                                    <Box sx={{mt: 5}}>
                                        <Card
                                            sx={{
                                                maxWidth: 760,
                                                mx: "auto",
                                                borderRadius: 4,
                                                background: "rgba(255,255,255,0.08)",
                                                backdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                p: 3,
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: "white",
                                                    fontWeight: 700,
                                                    mb: 3,
                                                    textAlign: "center",
                                                }}
                                            >
                                                Modifier vos liens
                                            </Typography>

                                            <Stack spacing={2}>
                                                {pathWithNestedBranchs?.branchs.map((link, index) => (
                                                    <TextField
                                                        key={link.id}
                                                        InputLabelProps={{shrink: true}}
                                                        label={`Link ${index + 1}`}
                                                        value={link.name_network}
                                                        variant="outlined"
                                                        onChange={(e) =>
                                                            handleBranchChange(link.id, e.target.value)
                                                        }
                                                        fullWidth
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: 3,
                                                                backgroundColor: "rgba(255,255,255,0.03)",
                                                                color: "white",
                                                            },
                                                            "& .MuiInputLabel-root": {color: "#cbd5e1"},
                                                        }}
                                                    />
                                                ))}
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                justifyContent="center"
                                                sx={{mt: 4}}
                                            >
                                                <Button
                                                    onClick={handleValidateLinks}
                                                    variant="contained"
                                                    sx={{
                                                        minWidth: 52,
                                                        borderRadius: 3,
                                                        background:
                                                            "linear-gradient(90deg, #22c55e, #16a34a)",
                                                    }}
                                                >
                                                    <DoneIcon/>
                                                </Button>

                                                <Button
                                                    onClick={handleCloseLinksFields}
                                                    variant="outlined"
                                                    sx={{
                                                        minWidth: 52,
                                                        borderRadius: 3,
                                                        color: "white",
                                                        borderColor: "rgba(255,255,255,0.18)",
                                                    }}
                                                >
                                                    <CloseIcon/>
                                                </Button>
                                            </Stack>
                                        </Card>
                                    </Box>
                                ) : (
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{mt: 5}}
                                    >
                                        {pathWithNestedBranchs?.branchs.map((b) => (
                                            <Grid item mt={2} key={b.id}>
                                                <Button
                                                    variant="contained"
                                                    href={b.url_network}
                                                    target="_blank"
                                                    sx={{
                                                        minWidth: 260,
                                                        textTransform: "none",
                                                        fontWeight: 700,
                                                        borderRadius: 3,
                                                        px: 3,
                                                        py: 1.2,
                                                        background:
                                                            "linear-gradient(90deg, #0f172a, #1e293b)",
                                                        border: "1px solid rgba(255,255,255,0.08)",
                                                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                                        "&:hover": {
                                                            background:
                                                                "linear-gradient(90deg, #1e293b, #334155)",
                                                        },
                                                    }}
                                                >
                                                    {b.name_network}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}

                                <Box display="flex" justifyContent="flex-end" mt={4}>
                                    <Button
                                        onClick={() => setModifyLinksFields(!modifyLinksFields)}
                                        variant="contained"
                                        sx={{
                                            minWidth: 48,
                                            borderRadius: 3,
                                            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                                        }}
                                    >
                                        <CreateIcon/>
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                )}
            </Container>
        </Box>
    );
};
