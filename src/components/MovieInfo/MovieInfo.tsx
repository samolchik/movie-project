import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import moment from "moment/moment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {baseImageURL, baseVideoURL, notImg} from "../../constants";
import {ButtonBack} from "../ButtonBack";
import {genreActions, movieActions} from "../../redux";
import {StarsRating} from "../StarsRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from './Movie.module.css'


const MovieInfo: FC = () => {
    const {genres} = useAppSelector(state => state.genreReducer);
    const {videos, page} = useAppSelector(state => state.movieReducer);

    const {state} = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const date = moment(state.release_date).format("DD MMM, YYYY");

    useEffect(() => {
        dispatch(genreActions.getAllGenre())
    }, [dispatch])

    const findGenres = genres.filter(item => state.genre_ids.includes(item.id));

    const findGenre =  (genre_ids) => {
        dispatch(movieActions.setGenreIds(genre_ids))
        dispatch(movieActions.searchMovieByGenre({genreIds: genre_ids, page}))

        navigate('/genres')
    }

    const sliceVideos = videos?.slice(0, 1);

    useEffect(() => {
            dispatch(movieActions.getVideoById(state.id))
    }, [dispatch, state]);

    return (
        <Box>
            <ButtonBack/>
            {
                state &&
                <Box sx={{backgroundColor: '#d0d1d3', padding: '40px', margin: '0 20px', borderRadius: '10px', filter: 'drop-shadow(-14px 4px 15px #000)'}}>
                    <Grid container spacing={1}
                          sx={{display: 'flex', marginTop: '3px', justifyContent: 'space-evenly'}}>
                        <Grid item md={4} xs={12}>
                            <Paper elevation={6} sx={{height: '500px', width: "350px", borderRadius: '3px'}}>
                                {
                                    state.poster_path ?
                                        <img className={css.Img} width={'400px'} height={'500px'}
                                            src={baseImageURL + state.poster_path} alt={state.title}/> :
                                        <img className={css.Img} width={'400px'} height={'500px'}
                                            src={notImg} alt={state.title}/>
                                }
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
                                        onClick={()=>findGenre(genre.id)}
                                        variant="contained"
                                        sx={{ margin: "12px 5px", display: 'flex'}}
                                        key={genre.id}>{genre.name}
                                    </Button>)
                                }
                            </Grid>
                            {
                                sliceVideos && sliceVideos.map(video=>(
                                    <Grid key={video.id} md={12} xs={12} item >
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={`${baseVideoURL}${video.key}`}
                                            title={'name'}
                                            allowFullScreen
                                        ></iframe>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Box>
            }
        </Box>
    );

};

export {MovieInfo};