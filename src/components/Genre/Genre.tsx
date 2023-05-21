import React, {FC} from "react";

import {Box, Button} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import { movieActions} from "../../redux";
import {IGenre} from "../../interfaces";
import css from '../Genres/Genres.module.css'

interface IProps {
    genre: IGenre,
    setId: (number)=> void
}

const Genre: FC<IProps> = React.memo(({genre, setId}) => {
        const {page} = useAppSelector((state => state.movieReducer))
        const dispatch = useAppDispatch();


        const findMovies = (genre_ids) => {
            dispatch(movieActions.searchMovieByGenre({genreIds: genre_ids, page}))
            dispatch(movieActions.setPage(page))
            setId(genre_ids)
        };

        return (
            <Box sx={{ marginLeft: '15px'}}>
                <Button
                    onClick={() => findMovies(genre.id)}
                    variant="contained"
                    sx={{margin: "12px 5px", display: 'flex', backgroundColor: '#969698'}}
                    className={css.Genre}
                    key={genre.id}>
                    {genre.name}
                </Button>
            </Box>
        )
    }
)

export {Genre};
