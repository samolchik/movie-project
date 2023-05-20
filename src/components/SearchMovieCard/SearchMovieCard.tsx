import {FC} from 'react';
import Badge from '@mui/material/Badge';

import {IMovie} from "../../interfaces";
import {baseImageURL} from "../../constants";
import './movies.css';
import '../../assets/normalise.css'
import {NavLink} from "react-router-dom";


interface IProps {
    movie: IMovie
}

const SearchMovieCard: FC<IProps> = ({movie}) => {
    const {id, title, poster_path, vote_average} = movie;


    return (
        <NavLink to={id.toString()} state={{...movie}}>
            <div className={'col s12 m6 l3'}>
                <div className={'card'}>
                    <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"}>
                        <div className={'card-image waves-effect waves-block waves-light'}>
                            {
                                poster_path == null ?
                                    <img
                                        src={`https://us.123rf.com/450wm/mattbadal/mattbadal1911/mattbadal191100006/135029891-missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg`}/> :
                                    <img src={baseImageURL + poster_path} alt={title}/>
                            }
                            {/*<div className="card-action">*/}
                            {/*    <p><a href="#">View details</a></p>*/}
                            {/*</div>*/}
                        </div>
                    </Badge>
                </div>
            </div>
        </NavLink>
    );
};

export {SearchMovieCard};