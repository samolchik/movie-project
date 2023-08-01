import React, { FC, useEffect } from 'react';

import Box from "@mui/material/Box";
import {
    Button,
    FormControl,
    InputLabel,
    Select,
    useTheme
} from "@mui/material";

import { genreActions, movieActions } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Genres: FC = () => {
    const { genres } = useAppSelector((state) => state.genreReducer);
    const { selectGenre } = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(genreActions.getAllGenre());
    }, [dispatch]);

    const selectMoviesByYGenre = (selectGenre) => {
        dispatch(movieActions.setFilterMovies('genres'))
        dispatch(movieActions.setSelectGenre(selectGenre));
    };

    return (
        <Box>
            <FormControl variant="standard" >
                <InputLabel id="demo-simple-standard-label" sx={{color: theme.palette.text.secondary}}>Genres</InputLabel>
                <Select
                    labelId="demo-simple-standard-label"
                    id="demo-simple-standard"
                    value={selectGenre}
                    label="Genres"
                    sx={{ width: '100px', color: theme.palette.text.secondary}}
                >
                    {genres && genres.map(genre =>
                        <Button
                            key={genre.id}
                            value={genre.id}
                            onClick={() => selectMoviesByYGenre(genre.id)}
                            sx={{ width: '150px', textTransform: 'none', margin: '5px'}}
                            variant={+selectGenre === genre.id ? "contained" : "outlined"}
                            color="primary"
                        >
                            {genre.name}
                        </Button>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
};

export { Genres };
