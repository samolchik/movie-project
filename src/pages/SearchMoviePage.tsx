import {FC} from 'react';

import {SearchMovie} from "../components";
import './pages.css';

const SearchMoviePage: FC = () => {
    return (
        <div className={'page'}>
            <SearchMovie/>
        </div>
    );
};

export {SearchMoviePage};