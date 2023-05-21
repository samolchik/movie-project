import React, {FC, useEffect} from 'react';

import {movieActions} from '../../redux';
import {MoviesListCard} from '../MoviesListCard';
import {useAppDispatch, useAppSelector} from '../../hooks';

const MoviesListCards: FC = () => {
    const dispatch = useAppDispatch();
    const {movies, page, isLoading} = useAppSelector((state) => state.movieReducer);

    useEffect(() => {
        dispatch(movieActions.getAllMovies(page));
    }, [dispatch, page]);

    return (
        <div className={'container'}
             style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {
                isLoading
                    ?
                    <div className={"progress"} style={{width: '400px', margin: 200}}>
                        <div className={"indeterminate"}></div>
                    </div>
                    :
                    <>
                        <div id={'results'} className={'row'}>
                            <div className={'col s12'}>
                                {
                                    movies.map((movie) => (
                                        <MoviesListCard key={movie.id} movie={movie}/>
                                    ))}
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export {MoviesListCards};
