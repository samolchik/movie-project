import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {Box, Button, Grid, Typography} from "@mui/material";
import moment from "moment/moment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {baseImageURL, baseVideoURL, notImg} from "../../constants";
import { movieActions} from "../../redux";
import {StarsRating} from "../StarsRating";
import {useAppDispatch, useAppSelector} from "../../hooks";
import css from './Movie.module.css'


const MovieInfo: FC = () => {
    const {genres} = useAppSelector(state => state.genreReducer);
    const {videos} = useAppSelector(state => state.movieReducer);

    const {state} = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const date = moment(state.release_date).format("DD MMM, YYYY");
    const findGenres = genres.filter(item => state.genre_ids.includes(item.id));

    const findMoviesByGenre = (genre_ids:number) => {
        dispatch(movieActions.setSelectGenre(genre_ids))
        // dispatch(movieActions.searchMovieByGenre({genreIds: genre_ids, page}))
        dispatch(movieActions.setFilterMovies('genres'))

        navigate('/home')
    }

    const sliceVideos = videos?.slice(0, 1);

    useEffect(() => {
        dispatch(movieActions.getVideoById(state.id))
    }, [dispatch, state]);

    return (
        <Box>
            {/*<ButtonBack/>*/}
            {
                state &&
                <Box sx={{
                    backgroundColor: '#d0d1d3',
                    p: '20px',
                    m: '20px 10px',
                    borderRadius: '10px',
                    filter: 'drop-shadow(-14px 4px 15px #000)',
                }}>
                    <Grid container spacing={1}
                          sx={{display: 'flex', mt: '3px', justifyContent: 'space-evenly'}}>
                        <Grid item md={4} xs={12}>
                            <Box sx={{borderRadius: '3px', display: 'flex', justifyContent: 'center'}}>
                                {
                                    state.poster_path ?
                                        <img className={css.Img}
                                             src={baseImageURL + state.poster_path} alt={state.title}/> :
                                        <img className={css.Img}
                                             src={notImg} alt={state.title}/>
                                }
                            </Box>
                        </Grid>
                        <Grid item md={7} xs={12}>
                            <Typography mb={2} variant={'h3'} sx={{display:{xs: 'none', md: 'flex'}}}>{state?.title}</Typography>
                            <Typography mb={2} variant={'h5'} sx={{display:{xs: 'flex', md: 'none'}, mt: '4px', mb: '8px'}}>{state?.title}</Typography>
                            <Typography mb={2} variant={'h6'} sx={{display:{xs: 'none', md: 'flex'}}}> {state.overview}</Typography>
                            <Typography mb={2} variant={'body1'} sx={{display:{xs: 'flex', md: 'none'}}}> {state.overview}</Typography>
                            <Typography variant={'body2'}>Date: {date}</Typography>
                            <Typography variant={'body2'}>Language: {state.original_language}</Typography>
                            <Typography variant={'body2'}>Popularity: {state.popularity}</Typography>
                            <Typography variant={'body2'}>Rating: {state.vote_average}</Typography>
                            <Typography variant={'body2'} sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <ThumbUpIcon sx={{mb: '5px'}}/> {state.vote_count}</Typography>
                            <StarsRating rating={state.vote_average}/>
                            <Grid item md={7} xs={12} sx={{margin: "12px 0", display: 'flex', flexDirection:'wrap', flexWrap:'wrap'}}>
                                {
                                    findGenres && findGenres.map(genre =>
                                        <Button
                                            onClick={() => findMoviesByGenre(genre.id)}
                                            variant="contained"
                                            className={css.Genres}
                                            sx={{m: "5px", display: 'flex'}}
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </Button>)
                                }
                            </Grid>
                            {
                                sliceVideos && sliceVideos.map(video => (
                                    <Grid key={video.id} md={12} xs={12} item>
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