import React, {FC} from "react";

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import {Box, useTheme} from "@mui/material";

import './pagination.css'

interface IProps {
    page: number
    setPage: (page: number) => void
    totalPages: number
}

const MoviePagination: FC<IProps> = ({page, setPage, totalPages}) => {
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (totalPages === null) {
        return null
    }

    return (
        <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Pagination
                    count={totalPages < 500 ? totalPages : 500}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    color="secondary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                        display: {xs: 'none', md: 'flex'},
                        border: '2px',
                        marginBottom: '10px',
                        padding: '6px',
                        backgroundColor: theme.palette.background.default,
                    }}
                />
                <Pagination
                    count={totalPages < 500 ? totalPages : 500}
                    siblingCount={0}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    color="secondary"
                    size="small"
                    showFirstButton
                    showLastButton
                    sx={{
                        display: {xs: 'flex', md: 'none'},
                        border: '2px',
                        marginBottom: '10px',
                        padding: '6px',
                        backgroundColor: theme.palette.background.default,
                    }}
                />
            </Box>
        </Stack>
    );
}

export {MoviePagination};