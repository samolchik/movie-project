import React, {useEffect} from "react"
import {Carousel} from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment/moment";

import {movieActions} from "../redux";
import {MoviesListCard} from "../components";
import {useAppDispatch, useAppSelector} from "../hooks";
import "./pages.css"

const HomePage = () => {

    const dispatch = useAppDispatch();
    const {movies, isLoading, page} = useAppSelector((state) => state.movieReducer);

    useEffect(() => {
        dispatch(movieActions.getPopularMovies(page));
    }, [dispatch, page]);

    return (
        <div className={"poster page"}>
            {
                isLoading
                    ?
                    <div className={"progress"} style={{width: '400px', margin: 200}}>
                        <div className={"indeterminate"}></div>
                    </div>
                    :
                    <>
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
                        <div className={'container'} style={{
                            marginTop: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div id={'results'} className={'row'}>
                                <div className={'col s12'}>
                                    {
                                        movies.map((movie) => (
                                            <MoviesListCard key={movie.id} movie={movie}/>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </>

            }
        </div>
    )
};

export {HomePage};