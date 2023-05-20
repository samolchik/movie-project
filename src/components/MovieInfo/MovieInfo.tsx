import React, {FC, useEffect, useState} from 'react';
import {Link, useLocation, useSearchParams} from "react-router-dom";

import {Box, Button, Grid, Paper, Typography, useTheme} from "@mui/material";
import moment from "moment/moment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';

import {baseImageURL} from "../../constants";
import {genreActions, movieActions} from "../../redux";
import {MoviesListCard} from "../MoviesListCard";
import {StarsRating} from "../StarsRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from './Movie.module.css'


const MovieInfo: FC = () => {
    const {state} = useLocation();
    const dispatch = useAppDispatch();
    const {page} = useAppSelector(state => state.movieReducer);
    const {genres} = useAppSelector(state => state.genreReducer);
    const [id, setId] = useState<number>(1);

    const date = moment(state.release_date).format("DD MMM, YYYY");
    const titleMovie = state.title ? state.title : state.original_title;

    useEffect(() => {
        dispatch(genreActions.getAllGenre())
    }, [dispatch])


    useEffect(() => {
        dispatch(movieActions.selectMovieByGenre({genre_ids: id, page}))
    }, [dispatch, id, page])


    const findGenres = genres.filter(item => state.genre_ids.includes(item.id));

    const findGenre = (id: number) => {
        dispatch(movieActions.selectMovieByGenre({genre_ids: id, page}))
        setId(id)
    }

    return (
        <Box sx={{height: 'max-height: max-content'}}>
            <Box sx={{margin: '10px 20px'}}>
                <Link style={{marginBottom: 30, width: 14, height: 24}} to={'/movies'}><ReplyIcon sx={{fontSize: 30}}/></Link>
            </Box>
            {
                state &&
                <Box sx={{backgroundColor: '#d0d1d3', padding: '40px', margin: '0 20px', borderRadius: '10px', filter: 'drop-shadow(-14px 4px 15px #000)'}}>
                    <Grid container spacing={1}
                          sx={{display: 'flex', marginTop: '3px', justifyContent: 'space-evenly'}}>
                        <Grid item md={4} xs={12}>
                            <Paper elevation={6} sx={{height: '500px', width: "350px", borderRadius: '3px'}}>
                                <img className={css.Img} width={'400px'} height={'500px'}
                                     src={baseImageURL + state.poster_path} alt={titleMovie}/>
                            </Paper>
                        </Grid>
                        <Grid item md={7} xs={12}>
                            <Typography mb={2} variant={'h3'}>{state?.title}</Typography>
                            <Typography mb={2} variant={'h5'}> {state.overview}</Typography>
                            <Typography variant={'h6'}>Rating: {state.vote_average}</Typography>
                            <StarsRating rating={state.vote_average}/>
                            <Typography mb={2} sx={{display: 'flex', alignItems: 'center', gap: '10px'}} variant={'body1'}>
                                <ThumbUpIcon/> {state.vote_count}</Typography>
                            <Typography variant={'body1'}>Date: {date}</Typography>
                            <Typography variant={'body1'}>Language: {state.original_language}</Typography>
                            <Typography variant={'body1'}>Popularity: {state.popularity}</Typography>
                            <Grid item md={7} xs={12} sx={{ margin: "12px 0", display: 'flex'}}>
                                {
                                findGenres && findGenres.map(genre =>
                                    <Button
                                        onClick={() => findGenre(genre.id)}
                                        variant="contained"
                                        sx={{ margin: "12px 5px", display: 'flex'}}
                                        key={genre.id}>{genre.name}
                                    </Button>)
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            }
        </Box>
    )
        ;

};

export {MovieInfo};