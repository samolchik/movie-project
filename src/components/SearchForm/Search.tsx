import React, {FC} from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {alpha, useTheme} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";

const Search: FC = () => {
    const {searchText} = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch()
    const theme = useTheme();

    const inputHandler = () => {
        dispatch(movieActions.setFilterMovies('search'));
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            inputHandler();
        }
    };

    return (
        <Paper
            sx={{
                p: '2px 4px', display: 'flex', alignItems: 'center', width: 350,
                background: theme.palette.background.default,
                backgroundColor: alpha(theme.palette.common.white, 0.02),
                '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.15),
                }
            }}
        >
            <InputBase
                sx={{ml: 1, flex: 1, color: theme.palette.text.secondary, fontSize: '18px'}}
                placeholder="Search movie ..."
                value={searchText}
                onChange={e => dispatch(movieActions.setSearchText(e.target.value))}
                onKeyDown={handleKeyPress}
                inputProps={{'aria-label': 'search movie'}}
            />
            <IconButton
                onClick={inputHandler}
                type="button"
                sx={{p: '10px', color: theme.palette.text.secondary}}
                aria-label="search"
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export {Search};
