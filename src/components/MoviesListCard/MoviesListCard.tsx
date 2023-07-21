import {FC} from 'react';
import {NavLink} from "react-router-dom";

import moment from "moment";
import {StarsRating} from "../StarsRating";

import {baseImageURL, notImg} from "../../constants";
import {IMovie} from "../../interfaces";
import './movies.css';
import {Box, Card, CardContent, CardMedia, Grid, Paper, Typography, useTheme} from '@mui/material';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";


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
            {/*<div className={'col s12 m6 l3'}>*/}
            {/*    <div className={'card'}>*/}
            {/*        <div className="card-image waves-effect waves-block waves-light">*/}
            {/*            {*/}
            {/*                poster_path ?*/}
            {/*                    <img src={baseImageURL + poster_path} alt={title}/> :*/}
            {/*                    <img src={notImg} alt={title}/>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        <div className="card-content info">*/}
            {/*            <div className="grey-text text-darken-2 fontSize-8" style={{height:'40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{title}</div>*/}
            {/*            <div style={{padding: '5px 0'}}>*/}
            {/*                <StarsRating rating={vote_average}/>*/}
            {/*            </div>*/}
            {/*            <div>{date}</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Card sx={{maxHeight: 600, position: 'relative', cursor: 'pointer'}}>
                <CardMedia
                    component="img"
                    height="400"
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
                        paddingBottom: 0
                    }}
                >
                    <Box sx={{height: {xs: 50, md: 60}, textAlign: 'center'}}>
                        < Typography variant="body1" color="text.secondary">
                            {title}
                        </Typography>
                    <Typography color="text.secondary">
                        {date}
                    </Typography>

                        <StarsRating rating={vote_average}/>
                    </Box>
                </CardContent>
            </Card>
        </NavLink>
    );
};

export {MoviesListCard};