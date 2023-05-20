import React, {useEffect} from "react"
import {Carousel} from 'react-responsive-carousel';
import {useSearchParams} from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment/moment";

import {movieActions} from "../redux";
import {MoviePagination, MoviesListCards} from "../components";
import {useAppDispatch, useAppSelector} from "../hooks";
import "./pages.css"

const HomePage = () => {

    const dispatch = useAppDispatch();
    const {movies} = useAppSelector((state) => state.movieReducer);
    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        setQuery(prev => ({...prev, page: '1'}))
    }, [setQuery])

    useEffect(() => {
        dispatch(movieActions.getPopularMovies(+query.get('page')));
    }, [dispatch, query]);


    return (
        <div className="poster page">
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
                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.title}/>
                            </div>
                            <div className={"posterImage-overlay"}>
                                <div className={"posterImage-title"}>{movie ? movie.original_title : ""}</div>
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
            <MoviesListCards/>
            <MoviePagination/>
        </div>
    )
};

export {HomePage};