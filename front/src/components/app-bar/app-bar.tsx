import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authentication/auth-slice.ts";
import { RootState } from "../../store.ts";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const AppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector((state: RootState) => state.authentication.role);
    const userFirstname = useSelector(
        (state: RootState) => state.authentication.firstname
    );
    const userUrlPicture = useSelector(
        (state: RootState) => state.authentication.pictureUrl
    );

    const handleRedirect = (url: string) => {
        setAnchorElUser(null);
        nav(url);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (selectable: string) => {
        if (selectable === "Logout") {
            dispatch(logout());
        }

        if (selectable === "Dashboard") {
            nav("/dashboard");
        }

        setAnchorElUser(null);
    };

    return (
        <>
            <Box
                sx={{
                    background:
                        "linear-gradient(180deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
                    minHeight: "100vh",
                }}
            >
                <Container maxWidth="lg" sx={{ pt: 3 }}>
                    <Box
                        sx={{
                            borderRadius: "24px",
                            background: "rgba(15, 23, 42, 0.78)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                            px: { xs: 1, md: 2 },
                        }}
                    >
                        <Toolbar disableGutters sx={{ minHeight: 78 }}>
                            <Box
                                onClick={() => nav("/")}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    mr: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "linear-gradient(135deg, #38bdf8, #6366f1)",
                                        boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
                                        mr: 1.5,
                                    }}
                                >
                                    <ParkIcon sx={{ color: "white" }} />
                                </Box>

                                <Typography
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                        fontWeight: 800,
                                        letterSpacing: "0.18rem",
                                        color: "white",
                                        fontSize: "1rem",
                                    }}
                                >
                                    LINK TREE
                                </Typography>
                            </Box>

                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                                <IconButton
                                    onClick={handleOpenNavMenu}
                                    sx={{
                                        color: "white",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorElNav}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    PaperProps={{
                                        sx: {
                                            mt: 1.5,
                                            borderRadius: 3,
                                            background: "rgba(15, 23, 42, 0.96)",
                                            backdropFilter: "blur(12px)",
                                            color: "white",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            minWidth: 180,
                                        },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography>{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    gap: 1,
                                }}
                            >
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            color: "#e2e8f0",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            borderRadius: 3,
                                            px: 2,
                                            "&:hover": {
                                                backgroundColor: "rgba(255,255,255,0.06)",
                                            },
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            {role ? (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar
                                                alt={userFirstname || "User"}
                                                src={userUrlPicture}
                                                sx={{
                                                    width: 42,
                                                    height: 42,
                                                    border: "2px solid rgba(255,255,255,0.15)",
                                                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>

                                    <Menu
                                        anchorEl={anchorElUser}
                                        open={Boolean(anchorElUser)}
                                        onClose={() => setAnchorElUser(null)}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                minWidth: 220,
                                                borderRadius: 4,
                                                background: "rgba(15, 23, 42, 0.96)",
                                                backdropFilter: "blur(12px)",
                                                color: "white",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                                                overflow: "hidden",
                                            },
                                        }}
                                    >
                                        <Box sx={{ px: 2, py: 1.5 }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "white",
                                                }}
                                            >
                                                {userFirstname || "Utilisateur"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#94a3b8",
                                                }}
                                            >
                                                Compte connecté
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

                                        {role === "ADMIN" && (
                                            <MenuItem onClick={() => handleRedirect("/admin")}>
                                                <Typography sx={{ color: "#f87171", fontWeight: 600 }}>
                                                    Admin
                                                </Typography>
                                            </MenuItem>
                                        )}

                                        {settings.map((setting) => (
                                            <MenuItem
                                                key={setting}
                                                onClick={() => handleCloseUserMenu(setting)}
                                            >
                                                <Typography
                                                    sx={{
                                                        color:
                                                            setting === "Logout" ? "#f8fafc" : "#e2e8f0",
                                                        fontWeight: setting === "Logout" ? 700 : 500,
                                                    }}
                                                >
                                                    {setting}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1.5,
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        onClick={() => nav("/login")}
                                        sx={{
                                            color: "white",
                                            fontWeight: 700,
                                            textTransform: "none",
                                            borderRadius: 3,
                                            px: 2.5,
                                            display: { xs: "none", sm: "inline-flex" },
                                        }}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={() => nav("/register")}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderRadius: 3,
                                            px: 3,
                                            py: 1.2,
                                            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                                            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            )}
                        </Toolbar>
                    </Box>
                </Container>

                <Box sx={{ pt: 4 }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};
