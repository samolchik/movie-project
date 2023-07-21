import React, {FC, useEffect} from 'react';

import {Genres, MoviePagination} from "../components";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";
import {YearsSelect} from "../components/YearSelect";
import Box from "@mui/material/Box";


const GenrePage: FC = () => {
    const {movies, isLoading, page, totalPages} = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();

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
                        <YearsSelect/>
                        <Genres/>

                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <MoviePagination page={page} setPage={setPages} totalPages={totalPages}/>
                        </Box>
            {/*        </>*/}
            {/*}*/}
        </div>
    );
};

export {GenrePage};