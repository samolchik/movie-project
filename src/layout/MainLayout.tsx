import { FC, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Container, createTheme, ThemeProvider} from '@mui/material';

import {Header, MoviePagination} from '../components';
import {useAppSelector} from "../hooks";



const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#74757e',
        },
        secondary: {
            main: '#415781',
        },
        background: {
            default: '#FFFFFF',
        },
        text: {
            primary: '#5F5F5F',
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
            main: '#233352',
        },
        background: {
            default: '#4766a2',
        },
        text: {
            primary: '#FDC998',
            secondary: '#de883c',
        },

    },
});

const MainLayout: FC = () => {
    const {page, } = useAppSelector(state => state.movieReducer);
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
                    backgroundColor: darkMode ?  '#2A2D34':'#cdcecf',
                    padding: '30px'
                }}>
                    <Header switcher={handleThemeChange} />
                    <Outlet />
                    <MoviePagination page={page}/>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export { MainLayout };