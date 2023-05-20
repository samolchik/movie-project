import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {movieActions} from '../../redux';
import {MoviesListCard} from '../MoviesListCard';
import {useSearchParams} from 'react-router-dom';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton"

const MoviesListCards: FC = () => {
    const dispatch = useAppDispatch();
    const {movies, isLoading} = useAppSelector((state) => state.movieReducer);
    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        setQuery(prev => ({...prev, page: '1'}))
    }, [setQuery])

    useEffect(() => {
        dispatch(movieActions.getAllMovies(+query.get('page')));
    }, [dispatch, query]);

    return (
        <div className={'container'} style={{marginTop: '40px'}}>
            {
                isLoading
                    ?
                    <div className="cards">
                        <SkeletonTheme highlightColor="#444">
                            <Skeleton height={300} duration={2}/>
                        </SkeletonTheme>
                    </div> :
                    <div id={'results'} className={'row'}>
                        <div className={'col s12'}>
                            {
                                movies.map((movie) => (
                                    <MoviesListCard key={movie.id} movie={movie}/>
                                ))}
                        </div>
                    </div>
            }
        </div>
    );
};

export {MoviesListCards};
