import {FC} from 'react';
import {NavLink} from "react-router-dom";

import moment from "moment";
import {StarsRating} from "../StarsRating";

import {baseImageURL, notImg} from "../../constants";
import {IMovie} from "../../interfaces";
import './movies.css';
import {Box, Card, CardContent, CardMedia, Typography, useTheme} from '@mui/material';


interface IProps {
    movie: IMovie
}

const MoviesListCard: FC<IProps> = ({movie}) => {
    const {title, poster_path, vote_average, release_date, id, vote_count} = movie;

    const date = moment(release_date).format("DD MMM, YYYY");
    const imgUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `${notImg}`;
    const theme = useTheme();

    return (
        <NavLink to={id.toString()} state={{...movie}}>
            <Card sx={{maxHeight: 600, position: 'relative', cursor: 'pointer'}}>
                <CardMedia
                    component="img"
                    height="420"
                    image={imgUrl}
                    alt={title}
                />
                <CardContent
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 1,
                    }}
                >
                    <Box sx={{
                        height: {xs: 50, md: 64},
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        < Typography variant="body1" color="text.primary" sx={{textAlign:'center'}}>
                            {title}
                        </Typography>
                        <Typography color="text.primary" sx={{mb:'7px'}}>
                            {date}
                        </Typography>

                        <StarsRating rating={vote_average} />
                    </Box>
                </CardContent>
            </Card>
        </NavLink>
    );
};

export {MoviesListCard};