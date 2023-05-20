import {FC} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {SubmitHandler, useForm} from "react-hook-form";
import {ISearch} from "../../interfaces";
import {useSearchParams} from "react-router-dom";

const SearchMovieForm: FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {isValid, errors},
    } = useForm<ISearch>({mode: 'all'});

    const [, setQuery] = useSearchParams({query: '', page: '1'});


    const search: SubmitHandler<ISearch> = async (data) => {
        setQuery({query: data.searchText, page: '1'});
        reset();
    };


    return (
        <form className={'search-form'} onSubmit={handleSubmit(search)}>
            <input
                className={"input-field"}
                type="text"
                placeholder="Search movie"
                {...register('searchText', {required: true})}
            />
            {errors.searchText && <span>This field is required</span>}

            <button className='search-icon' type="submit" disabled={!isValid}>
                <SearchIcon/>
            </button>
        </form>
    );
};

export {SearchMovieForm};