import React, {FC} from "react";

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";

import './pagination.css'

interface IProps {
    page: number
    setPage: (page:number) => void
    totalPages: number
}

const MoviePagination: FC<IProps> = ({ page, setPage, totalPages}) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (totalPages === null) {
        return null
    }

    return (
        <Stack spacing={2}>
            <Box>
                <Pagination
                    count={totalPages<500? totalPages : 500}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"

                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{border:'2px',marginBottom: '10px'}}
                />
            </Box>
        </Stack>
    );
}

export {MoviePagination};