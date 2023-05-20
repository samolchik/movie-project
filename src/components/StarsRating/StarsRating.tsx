import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {FC} from 'react';
import {IRating} from "../../interfaces/rating.interface";

interface IProps {
    rating: number
}

const StarsRating: FC<IProps> = ({rating}) => {

    // export default function HalfRating() {
    return (
        <Stack spacing={1}>
            <Rating sx={{fontSize:14}} name="half-rating-read" defaultValue={rating} precision={0.5} max={10} readOnly/>
        </Stack>
    );
}

export {StarsRating};