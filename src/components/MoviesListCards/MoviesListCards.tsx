import React, {FC, useEffect} from 'react';

import Box from "@mui/material/Box";

import {movieActions} from '../../redux';
import {MoviesListCard} from '../MoviesListCard';
import {MoviePagination} from "../MoviePagination";
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Grid} from "@mui/material";

const MoviesListCards: FC = () => {
    const dispatch = useAppDispatch();
    const {movies, page, totalPages, isLoading} = useAppSelector((state) => state.movieReducer);

    useEffect(() => {
        dispatch(movieActions.getAllMovies(page));
    }, [dispatch, page]);

    const setPages = (pages: number) => {
        dispatch(movieActions.setPage(pages))
    }


    return (
        // <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        //     {
        //         isLoading
        //             ?
        //             <div className={"progress"} style={{width: '400px', margin: 200}}>
        //                 <div className={"indeterminate"}></div>
        //             </div>
        //             :
        //             <>
        //                 {/*<div className={'row'}>*/}
        //                 {/*    <div className={'col s12'}>*/}
        //                 {/*        {*/}
        //                 {/*            movies.map((movie) => (*/}
        //                 {/*                <MoviesListCard key={movie.id} movie={movie}/>*/}
        //                 {/*            ))}*/}
        //                 {/*    </div>*/}
        //                 {/*</div>*/}
        //                 <Box>
        //                     <MoviePagination page={page} setPage={setPages} totalPages={totalPages}/>
        //                 </Box>
        //             </>
        //     }
        // </div>

        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            {
                isLoading ?
                    <div className={"progress"} style={{width: '400px', margin: 200}}>
                        <div className={"indeterminate"}></div>
                    </div>
                    :
                    <Grid container spacing={4} sx={{display: {xs: 'flex', flexDirection: 'row', md: 'flex'} }}>
                        {movies.map((movie) => (
                            <Grid item xs={12} md={3}  key={movie.id}>
                                <MoviesListCard movie={movie}/>
                            </Grid>
                        ))}
                    </Grid>
            }
            {/*<Box>*/}
            {/*    <MoviePagination page={page} setPage={setPages} totalPages={totalPages}/>*/}
            {/*</Box>*/}
        </Box>
    );
};

export {MoviesListCards};
