import React, {FC, useEffect, useState} from 'react';

import Box from "@mui/material/Box";
import {Grid, Paper, styled} from "@mui/material";

import {genreActions, movieActions} from '../../redux';
import {Genre} from "../Genre";
import {MoviesListCards} from "../MoviesListCards";
import {useAppDispatch, useAppSelector} from '../../hooks';

import css from './Genres.module.css';

const Genres: FC = () => {
    const {genres} = useAppSelector((state) => state.genreReducer);
    const { page } = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const [id, setId] = useState(null);

    useEffect(() => {
        dispatch(genreActions.getAllGenre());
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(movieActions.searchMovieByGenre({genreIds: id, page}))
    }, [dispatch, page, id])


    const PositionSticky = styled(Paper)(({theme}) => ({
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        background: theme.palette.primary.main,
        position: 'sticky',
        boxSizing: 'border-box',
        top: theme.spacing(2)
    }));

    return (
        <Box sx={{flexGrow: 1, marginTop: 2}} className={css.Genres}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                    <Paper variant="outlined" sx={{backgroundColor: '#74757e'}}>
                        <MoviesListCards />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={2}>
                    <PositionSticky variant="outlined">
                        <Paper variant="outlined" sx={{backgroundColor: '#e3e2e0'}}>
                            {
                                genres && genres.map(genre => <Genre key={genre.id} genre={genre} setId={setId}/>)
                            }
                        </Paper>
                    </PositionSticky>
                </Grid>
            </Grid>
        </Box>
    );
};


export {Genres};
