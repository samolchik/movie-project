import React, {FC, useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchActions } from "../../redux";
import { useTheme } from "@mui/material";

const Search: FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const { page } = useAppSelector((state) => state.searchReducer);
    const dispatch = useAppDispatch()
    const theme = useTheme();

    const inputHandler = () => {
        dispatch(searchActions.searchMovie({
            searchText, page
        }));
        setSearchText('')
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            inputHandler();
        }
    };

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px', display: 'flex', alignItems: 'center', width: 350,
                background: theme.palette.background.default,
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, color: theme.palette.text.secondary, fontSize: '18px' }}
                placeholder="Search movie ..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleKeyPress}
                inputProps={{ 'aria-label': 'search movie' }}
            />
            <IconButton
                onClick={inputHandler}
                type="button"
                sx={{ p: '10px', color: theme.palette.text.secondary }}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export { Search };
