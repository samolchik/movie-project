import {FC} from 'react';
import {NavLink} from "react-router-dom";

import Badge from '@mui/material/Badge';

import {IMovie} from "../../interfaces";
import {baseImageURL, notImg} from "../../constants";
import './movies.css';

interface IProps {
    movie: IMovie
}

const SearchMovie: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average} = movie;


    return (
        <NavLink to={id.toString()} state={{...movie}}>
            <div className={'col s12 m6 l3'}>
                <div className={'card'}>
                    <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"}>
                        <div className={'card-image waves-effect waves-block waves-light'}>
                            {
                                poster_path ?
                                    <img src={baseImageURL + poster_path} alt={title}/> :
                                    <img src={notImg} alt={title}/>
                            }
                        </div>
                    </Badge>
                </div>
            </div>
        </NavLink>
    );
};

export {SearchMovie};