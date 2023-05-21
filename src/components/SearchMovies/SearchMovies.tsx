import React, {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import {useAppDispatch, useAppSelector} from '../../hooks';
import {searchActions} from '../../redux';
import {SearchMovie} from '../SearchMovie';
import {SearchMovieForm} from "../SearchMovieForm";

const SearchMovies: FC = () => {
    const dispatch = useAppDispatch();
    const {searchMovies, searchText, isLoading, page} = useAppSelector((state) => state.searchReducer);
    const [query] = useSearchParams();

    useEffect(() => {
        dispatch(
            searchActions.getSearchMovie({
                searchText: query.get('query') ?? '',
                page
            })
        );
    }, [query, dispatch, page]);

    return (
        <Container fixed>
            <Box sx={{height: '100vh', margin: '40px', padding: '10px'}}>
                <SearchMovieForm/>
                {
                    isLoading
                        ?
                        <div className={"progress"} style={{width: '400px', margin: 200}}>
                            <div className={"indeterminate"}></div>
                        </div>
                        :

                        <Box className="row">
                            {searchMovies.map((movie) => (
                                <SearchMovie key={movie.id} movie={movie}/>
                            ))}
                            {searchText && !searchMovies && <h2>No Movies Found</h2>}
                        </Box>
                }
            </Box>
        </Container>
    );
};

export {SearchMovies};