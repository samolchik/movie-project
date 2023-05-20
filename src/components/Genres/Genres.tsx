import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { genreActions, movieActions } from '../../redux';
import { Genre } from '../Genre';
import { IGenre, IMovie } from '../../interfaces';
import css from './Genres.module.css';
import { useSearchParams } from 'react-router-dom';
import { MoviesListCard } from '../MoviesListCard';

const Genres: FC = () => {
    const { genres, selectedGenre } = useAppSelector((state) => state.genreReducer);
    const { movies, page } = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);
    const [id, setId] = useState<number>(1);

    useEffect(() => {
        dispatch(genreActions.getAllGenre());
    }, [dispatch]);

    useEffect(() => {
        setQuery((prev) => ({ ...prev, page: '1' }));
    }, [setQuery]);

    useEffect(() => {
        dispatch(movieActions.selectMovieByGenre({genre_ids: id, page}))
    }, [dispatch, id, page])

    const handleGenreSelect = (genre: IGenre) => {
        const index = selectedGenres.findIndex((selectedGenre) => selectedGenre.id === genre.id);
        if (index === -1) {
            setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
        } else {
            setSelectedGenres((prevSelectedGenres) => prevSelectedGenres.filter((g) => g.id !== genre.id));
        }
    };

    const isGenreSelected = (genre: IGenre) => {
        return selectedGenres.some((selectedGenre) => selectedGenre.id === genre.id);
    };
    console.log(isGenreSelected);
    const filterMoviesByGenre = (movie: IMovie) => {
        if (selectedGenres.length === 0) {
            return true;
        }
        return movie.genres.some((genre) => isGenreSelected(genre));
    };

    console.log(movies);
    console.log(genres);

    return (
        <div className={css.Genres}>
            {genres.map((genre) => (
                <Genre key={genre.id} genre={genre} selected={isGenreSelected(genre)} onSelect={handleGenreSelect} />
            ))}
            <div className={'container'}>
                <div id={'results'} className={'row'}>
                    <div className={'col s12'}>
                        {movies.filter(filterMoviesByGenre).map((movie) => (
                            <MoviesListCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Genres };
