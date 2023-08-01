import React, { FC, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Box, Grid, Typography, useTheme } from "@mui/material";
import moment from "moment";

import { Genres, MoviePagination, MoviesListCards, Search, YearsSelect } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { movieActions } from "../redux";
import  '../pages/pages.css'


const HomePage: FC = () => {
    const { movies, page, totalPages } = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const setPages = (pages: number) => {
        dispatch(movieActions.setPage(pages));
    }

    useEffect(() => {
        dispatch(movieActions.getPopularMovies(page));
    }, [dispatch, page]);


    return (
        <div>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    movies.map(movie => (
                        <div key={movie.id} style={{ textDecoration: "none", color: "white" }}>
                            <div className={"posterImage"}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                                    alt={movie.title}
                                />
                            </div>
                            <div className={"posterImage-overlay"}>
                                <div className={"posterImage-title"}>{movie ? movie.original_title : ""}</div>
                                <div className={"posterImage-runtime"}>
                                    {movie ? moment(movie.release_date).format("DD MMM, YYYY") : ""}
                                    <span className={"posterImage-rating"}>
                                        Rating {movie ? movie.vote_average : ""}
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
                margin: '10px 18px 0 18px',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
                <Typography variant={'h5'} sx={{
                    color: theme.palette.text.secondary,
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)'
                }}>
                    Find the best movies
                </Typography>
                <YearsSelect />
                <Genres />
                <Search />
            </Box>
            <Grid item xs={12} md={12} sx={{ padding: '20px' }}>
                <MoviesListCards />
            </Grid>
            <MoviePagination page={page} setPage={setPages} totalPages={totalPages} />
        </div>
    );
};

export { HomePage };
