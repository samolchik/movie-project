import React, {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

import {MoviesListCard} from "../MoviesListCard";
import {searchActions} from '../../redux';
import {useAppDispatch, useAppSelector} from '../../hooks';

const SearchMovies: FC = () => {
    const dispatch = useAppDispatch();
    const {searchMovies, searchText, page} = useAppSelector((state) => state.searchReducer);
    const [query] = useSearchParams();

    useEffect(() => {
        dispatch(
            searchActions.searchMovie({
                searchText: query.get('query') ?? '',
                page
            })
        );
        dispatch(searchActions.setPage(page))
    }, [query, dispatch, page]);


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Grid container spacing={4} sx={{display: {xs: 'flex', flexDirection: 'row', md: 'flex'}}}>
                    {searchMovies.map((movie) => (
                        <Grid item xs={12} md={3} key={movie.id}>
                        <MoviesListCard key={movie.id} movie={movie}/>
                    {!searchMovies && <h2>`Not found movie for this keyword ${searchText}` </h2>}
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export {SearchMovies};