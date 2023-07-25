import React, { FC, useEffect } from 'react';

import Box from "@mui/material/Box";
import {
    Button,
    FormControl,
    InputLabel, Paper,
    Select,
    useTheme
} from "@mui/material";

import { genreActions, movieActions } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Genres: FC = () => {
    const { genres } = useAppSelector((state) => state.genreReducer);
    const { page, selectGenre } = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(genreActions.getAllGenre());
    }, [dispatch]);

    const findMovies = (selectedGenre) => {
        dispatch(movieActions.searchMovieByGenre({ genreIds: selectedGenre, page }));
        dispatch(movieActions.setSelectGenre(selectedGenre));
    };

    return (
        <Box>
            <FormControl variant="standard" >
                <InputLabel id="demo-simple-select-standard-label" sx={{color: theme.palette.text.secondary}}>Genres</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectGenre}
                    label="Age"
                    sx={{ width: '100px', color: theme.palette.text.secondary}}
                >
                    {genres && genres.map(genre =>
                        <Button
                            key={genre.id}
                            onClick={() => findMovies(genre.id)}
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
