import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";

import {joiResolver} from "@hookform/resolvers/joi";
import SearchIcon from "@mui/icons-material/Search";

import {ISearch} from "../../interfaces";
import {searchValidator} from "../../validators";

const SearchMovieForm: FC = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {isValid, errors},
    } = useForm<ISearch>({mode: 'all', resolver:joiResolver(searchValidator)});

    const [, setQuery] = useSearchParams({query: ''});

    const search: SubmitHandler<ISearch> = async (data) => {
        setQuery({query: data.searchText});
        reset();
    };

    return (
        <form className={'search-form'} onSubmit={handleSubmit(search)} style={{marginBottom: '30px', marginLeft:'17%'}}>
            <input
                type="text"
                placeholder="Search movie..."
                {...register('searchText', {required: true})}
            />
            <button className={'search-icon'} type={"submit"} disabled={!isValid}>
                <SearchIcon/>
            </button>
            {errors.searchText && <div className={'errors'} style={{color: 'red'}}>{errors.searchText.message}</div>}
        </form>
    );
};

export {SearchMovieForm};