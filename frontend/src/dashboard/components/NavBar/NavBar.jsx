import { useState } from "react";
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";

const settings = ['Logout'];

export const NavBar = () => {
    const { user } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
  

    return (
  
        <AppBar position="fixed"
            sx={{
                backgroundColor: 'white',
                color: 'black',
                boxShadow: 'none',
                width: { md: `calc(100% - 270px)` },
                transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                marginTop: '8px',
                marginRight: '10px',
                height: '75px',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography
                    variant="h5"
                    noWrap
                    sx={{
                        mr: 2,
                        display: { md: 'flex' },
                        flexGrow: 1,
                        fontFamily: 'arial',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    ebookVault
                </Typography>

                <Box sx={{ flexGrow: 1 }}
                    display={{ xs: 'none', md: 'flex' }}
                    justifyContent="flex-end"
                >
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        sx={{
                            width: '100%',
                            fontSize: '1rem'
                        }}
                    />
                    <IconButton 
                        aria-label="search"
                        sx={{ p: 2, color: 'black', ml: 1 }}
                        onClick={() => navigate(`/search/${document.getElementById('search').value}`)}
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
                
                <Box 
                    sx={{ flexGrow: 2 }}
                    display={{ xs: 'none', md: 'flex' }}
                    justifyContent="flex-end"
                >
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={`${user.profilePicture}`} src={user.profilePicture} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
  
    )
}
