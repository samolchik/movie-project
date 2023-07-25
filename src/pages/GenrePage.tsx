import React, {FC, useEffect} from 'react';

import {Genres, MoviePagination, MoviesListCards} from "../components";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";
import {YearsSelect} from "../components/YearSelect";

import {Search} from "../components/SearchMovie/Search";
import {Box, Grid, Paper, Typography, useTheme} from "@mui/material";


const GenrePage: FC = () => {
    const {movies, isLoading, page, totalPages} = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const setPages = (pages: number) => {
        dispatch(movieActions.setPage(pages))
    }

    useEffect(() => {
        dispatch(movieActions.getPopularMovies(page));
    }, [dispatch, page]);

    return (
        <div>
            {/*{*/}
            {/*    isLoading*/}
            {/*        ?*/}
            {/*        <div className={"progress"} style={{width: '400px', margin: 200}}>*/}
            {/*            <div className={"indeterminate"}></div>*/}
            {/*        </div>*/}
            {/*        :*/}
            {/*        <>*/}
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    movies.map(movie => (
                        <div key={movie.id} style={{textDecoration: "none", color: "white"}}>
                            <div className={"posterImage"}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                    alt={movie.title}/>
                            </div>
                            <div className={"posterImage-overlay"}>
                                <div
                                    className={"posterImage-title"}>{movie ? movie.original_title : ""}</div>
                                <div className={"posterImage-runtime"}>
                                    {movie ? moment(movie.release_date).format("DD MMM, YYYY") : ""}
                                    <span className={"posterImage-rating"}>
                                            {movie ? movie.vote_average : ""}
                                        <i className={"fas fa-star"}/>{" "}
                                        </span>
                                </div>
                                <div className={"posterImage-desc"}>{movie ? movie.overview : ""}</div>
                            </div>
                        </div>
                    ))
                }
            </Carousel>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin:'10px 18px 0 18px',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
                <Typography variant={'h5'} sx={{color: theme.palette.text.secondary, textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)'}} >
                    Find the best movies
                </Typography>
                <YearsSelect/>
                <Genres/>
                <Search/>
            </Box>
            <Grid item xs={12} md={12} sx={{padding: '20px'}}>
                <MoviesListCards/>
            </Grid>
            <MoviePagination page={page} setPage={setPages} totalPages={totalPages}/>
        </div>
    );
};

export {GenrePage};