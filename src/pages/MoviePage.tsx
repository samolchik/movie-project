import {FC} from 'react';

import {MoviesListCards, MoviePagination} from "../components";
import './pages.css'

const MoviePage: FC = () => {
    return (
        <div className={'page'}>
            <MoviesListCards/>
            <MoviePagination/>
        </div>
    );
};

export {MoviePage};