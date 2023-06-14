import React, {FC, useState} from "react";
import {NavLink} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";

import css from './Header.module.css'
import {Switcher} from "../Switcher/Switcher";


interface IProps {
    switcher: () => void
}

const Header: FC<IProps> = ({ switcher}) => {
    const pages = ['popular', 'genres']
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <AppBar position="static" className={css.Header} sx={{ filter: 'drop-shadow(-14px 4px 15px #000)'}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <LocalMoviesIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="popular"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                        }}>
                        MoVoK
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}>

                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink to={page}>{page}</NavLink>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <LocalMoviesIcon sx={{display: {xs: 'flex', md: 'none', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="popular"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                        }}>
                        MoVoK
                    </Typography>
                    <Box className={css.NavLink} sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'text.primary', display: 'block', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',}}
                            >
                                <NavLink to={page}>{page}</NavLink>
                            </Button>
                        ))}
                        <NavLink to={'search'} style={{display: "flex", alignItems: "center"}}>
                            <SearchIcon/>
                        </NavLink>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0, display: 'flex'}}>
                                <Typography sx={{color: 'silver', marginRight: 2}}>Olga</Typography>
                                <Avatar alt="avatar"
                                        src="https://i.pinimg.com/564x/08/bb/e6/08bbe676d84bb960c1d06d3789f41639.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
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
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex', marginLeft: '50px'}}}>
                        <Switcher switcher={switcher} />
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none', marginLeft: '10px'}}}>
                        <Switcher switcher={switcher} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export {Header};
