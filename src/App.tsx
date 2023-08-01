import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import Box from "@mui/material/Box";

import {HomePage, MovieInfoPage} from "./pages";
import {MainLayout} from "./layout";

function App() {

    return (
        <Box>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'home/:id'} element={<MovieInfoPage/>}/>
                </Route>
            </Routes>
        </Box>
    );
}

export default App;
