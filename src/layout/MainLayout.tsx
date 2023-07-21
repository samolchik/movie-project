import {FC, useCallback, useState} from 'react';
import {Outlet} from 'react-router-dom';

import {Box, Container, createTheme, ThemeProvider} from '@mui/material';

import {Header} from '../components';

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#5a5b5d',
        },
        secondary: {
            main: '#939494',
        },
        background: {
            default: '#cdcecf',
        },
        text: {
            primary: '#b9b7b7',
            secondary: '#333232',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#161b25',
        },
        secondary: {
            main: '#e9eaec',
        },
        background: {
            default: '#2A2D34',
        },
        text: {
            primary: '#0b0c0c',
            secondary: '#1e2121',
        },
    },
});


const MainLayout: FC = () => {
    const [darkMode, setDarkMode] = useState(true);

    const handleThemeChange = useCallback(
        () => {
            setDarkMode(!darkMode);
        },
        [darkMode],
    );

    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Container maxWidth="xl" sx={{
                    backgroundColor: darkMode ? '#2A2D34' : '#cdcecf',
                    padding: '30px',
                    height: 'maxContent'
                }}>
                    <Header switcher={handleThemeChange}/>
                    <Outlet/>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export {MainLayout};