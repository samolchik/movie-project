import {FC} from 'react';
import {NavLink} from "react-router-dom";

import moment from "moment";
import {StarsRating} from "../StarsRating";

import {baseImageURL, notImg} from "../../constants";
import {IMovie} from "../../interfaces";
import './movies.css';


interface IProps {
    movie: IMovie
}

const MoviesListCard: FC<IProps> = ({movie}) => {
    const {title, poster_path, vote_average, release_date, id} = movie;

    const date = moment(release_date).format("DD MMM, YYYY");

    return (
        <NavLink to={id.toString()} state={{...movie}}>
            <div className={'col s12 m6 l3'}>
                <div className={'card'}>
                    <div className="card-image waves-effect waves-block waves-light">
                        {
                            poster_path ?
                                <img src={baseImageURL + poster_path} alt={title}/> :
                                <img src={notImg} alt={title}/>
                        }
                    </div>
                    <div className="card-content info">
                        <div className="grey-text text-darken-2 fontSize-8" style={{height:'40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{title}</div>
                        <div style={{padding: '5px 0'}}>
                            <StarsRating rating={vote_average}/>
                        </div>
                        <div>{date}</div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export {MoviesListCard};