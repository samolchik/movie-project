import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions, searchActions} from "../../redux";

const Search = () => {
    const [searchText, setSearchText] = useState<string>('');
    const {searchMovies, page} = useAppSelector((state) => state.searchReducer);
    const dispatch = useAppDispatch()

    const inputHandler = () => {
        dispatch(searchActions.getSearchMovie({searchText, page}))
        // dispatch(searchActions.setSearchText(''))
        setSearchText('')
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            event.preventDefault()
            inputHandler()
        }
    };

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 200}}
        >
            <InputBase
                sx={{ml: 1, flex: 1, color: 'gray', fontSize: '18px'}}
                placeholder="Search movie"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleKeyPress}
                inputProps={{'aria-label': 'search movie'}}
            />
            <IconButton
                onClick={inputHandler}
                type="button"
                sx={{p: '10px',}}
                aria-label="search"
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export {Search}