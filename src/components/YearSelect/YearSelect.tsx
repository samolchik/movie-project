import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";

interface YearOption {
    label: string;
    year: number;
}

const YearsSelect = () => {
    const {page, selectYear} = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const years: YearOption[] = Array.from({length: 2023 - 1930 + 1}, (_, index) => {
        const year = 2023 - index;
        return {label: `${year}`, year};
    });

    useEffect(() => {
        dispatch(movieActions.selectMoviesByYear({
            year: +selectYear, page
        }));
    }, [dispatch, page, selectYear]);

    const handleSelectChange = (event: SelectChangeEvent) => {
        dispatch(movieActions.setSelectYear(event.target.value as string));
    };


    return (
        <Box  sx={{ width: '80px'}}>
            <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-standard-label" sx={{color: theme.palette.text.secondary}}>Year</InputLabel>
                <Select
                    labelId="demo-simple-standard-label"
                    id="demo-simple-standard"
                    value={selectYear}
                    label="Year"
                    onChange={handleSelectChange}
                    sx={{color: theme.palette.text.secondary}}
                >
                    {years.map((item, idx) => (
                        <Button key={idx} value={item.year}>
                            {item.label}
                        </Button>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export {YearsSelect};