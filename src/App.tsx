import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import Box from "@mui/material/Box";

import {GenrePage, HomePage, SearchMoviePage, MovieInfoPage} from "./pages";
import {MainLayout} from "./layout";

function App() {

    return (
        <Box>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'popular'}/>}/>
                    <Route path={'popular'} element={<HomePage/>}/>
                    <Route path={'popular/:id'} element={<MovieInfoPage/>}/>
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
