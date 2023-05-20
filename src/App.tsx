import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import Box from "@mui/material/Box";

import {GenrePage, MoviePage, HomePage, SearchMoviePage, MovieInfoPage} from "./pages";
import {MainLayout} from "./layout";
import './App.css';


function App() {
    const [bgColor, setBgColor] = useState<string>('');
    const [bgColorHeader, setBgColorHeader] = useState<string>('');

    const toggleBgColor = () => {
        setBgColorHeader((prevColor) =>
            prevColor === '#0f0f10' ? '#1976d2' : '#0f0f10'
        );
        setBgColor((prevColor) =>
            prevColor === 'rgb(33 33 38)' ? '#fff' : 'rgb(33 33 38)'
        );
    };

    return (
        <Box className={'app'} style={{backgroundColor: bgColor}}>
            <Routes>
                <Route path={'/'} element={<MainLayout toggleBgColor={toggleBgColor} bgColorHeader={bgColorHeader}/>}>
                    <Route index element={<Navigate to={'popular'}/>}/>
                    <Route path={'popular'} element={<HomePage/>}/>
                    <Route path={'popular/:id'} element={<MovieInfoPage/>}/>
                    <Route path={'movies'} element={<MoviePage/>}/>
                    <Route path={'movies/:id'} element={<MovieInfoPage/>}/>
                    <Route path={'genres'} element={<GenrePage/>}/>
                    <Route path={'genres/:id'} element={<MovieInfoPage/>}/>
                    <Route path={'search'} element={<SearchMoviePage/>}/>
                    <Route path={'search/:id'} element={<MovieInfoPage/>}/>
                </Route>
            </Routes>
        </Box>
    );
}

export default App;
