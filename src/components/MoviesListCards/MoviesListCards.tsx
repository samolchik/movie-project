import React, {FC, useEffect} from 'react';

import Box from "@mui/material/Box";

import {movieActions} from '../../redux';
import {MoviesListCard} from '../MoviesListCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Grid} from "@mui/material";

const MoviesListCards: FC = () => {
    const dispatch = useAppDispatch();
    const {
        movies,
        page,
        filterMovies,
        selectGenre,
        selectYear,
        searchText
    } = useAppSelector((state) => state.movieReducer);

    useEffect(() => {
        switch (filterMovies) {
            case 'genres':
                dispatch(movieActions.searchMovieByGenre({ genreIds: selectGenre, page }));
                break;
            case 'years':
                dispatch(movieActions.selectMoviesByYear({ year: +selectYear, page }));
                break;
            case 'search':
                dispatch(movieActions.searchMovies({ searchText, page }));
                break;
            default:
                dispatch(movieActions.getAllMovies(page));
                break;
        }
    }, [dispatch, page, filterMovies, selectGenre, selectYear, searchText]);


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Grid container spacing={4} sx={{display: {xs: 'flex', flexDirection: 'row', md: 'flex'}}}>
                {movies.map((movie) => (
                    <Grid item xs={12} md={3} key={movie.id}>
                        <MoviesListCard movie={movie}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export {MoviesListCards};
