import React, {useState, useEffect} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";

interface YearOption {
    label: string;
    year: number;
}

const YearsSelect = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const {page} = useAppSelector((state) => state.movieReducer);

    const years: YearOption[] = [];
    for (let year = 2023; year >= 1930; year--) {
        years.push({label: String(year), year});
    }

    useEffect(() => {
        dispatch(movieActions.selectMoviesByYear({
            year: value, page
        }));
    }, [dispatch, page, value]);

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };


    return (
        <Box sx={{maxWidth: 120}}>
            <FormControl fullWidth sx={{marginBottom: '2px'}}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    // @ts-ignore
                    onChange={handleSelectChange}
                >
                    {years.map((item, idx) => (
                        <MenuItem key={idx} value={item.year}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export {YearsSelect};