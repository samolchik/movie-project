import {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ISearch} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useSearchParams} from 'react-router-dom';
import {searchActions} from '../../redux/slices/search.slice';
import {SearchMovieCard} from '../SearchMovieCard';
import SearchIcon from '@mui/icons-material/Search';
import {MoviePagination} from '../MoviePagination';
import {SearchMovieForm} from "../SearchMovieForm";

const SearchMovie: FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {isValid, errors},
    } = useForm<ISearch>({mode: 'all'});

    const [searchText, setSearchText] = useState<ISearch>(null);

    const dispatch = useAppDispatch();
    const {searchMovies} = useAppSelector((state) => state.searchReducer);
    const [query, setQuery] = useSearchParams({query: '', page: '1'});

    useEffect(() => {
        dispatch(
            searchActions.getSearchMovie({
                searchText: query.get('query') ?? '',
                page: +query.get('page'),
            })
        );
    }, [query, dispatch]);

    return (
        <div className={"container"}>
            <SearchMovieForm/>
                <div className="row">
                    {searchMovies.map((movie) => (
                        <SearchMovieCard key={movie.id} movie={movie}/>
                    ))}
                    {searchText && !searchMovies && <h2>No Movies Found</h2>}
                </div>
        </div>
    );
};

export {SearchMovie};