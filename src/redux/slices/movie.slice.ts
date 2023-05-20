import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";
import {IError, IMovie, IPagination} from "../../interfaces";
import { movieService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies: IMovie[],
    page: number,
    numOfPages: number,
    errors: IError,
    isLoading: boolean,
}

const initialState:IState = {
    movies: [],
    page: 1,
    numOfPages: 0,
    errors: null,
    isLoading: false,
};

const getAllMovies = createAsyncThunk<IPagination<IMovie[]>, number>(
    'movieSlice/getAllMovies',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getPopularMovies = createAsyncThunk<IPagination<IMovie[]>, number>(
    'movieSlice/getPopularMovies',
    async (page, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getPopular(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);


const selectMovieByGenre = createAsyncThunk<IPagination<IMovie[]>, { genre_ids: number, page: number }>(
    'searchSlice/selectMovieByGenre',
    async ({genre_ids, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.searchMoviesByGenreId(page, genre_ids)
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        updatePageAction(state, action) {
            state.movies = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(getAllMovies, getPopularMovies, selectMovieByGenre), (state, action) => {
                const {page, results, total_pages} = action.payload;
                state.movies = results;
                state.page = page;
                state.numOfPages = total_pages;
                state.isLoading = false;
            })

            .addMatcher(isPending(), state => {
                state.isLoading = true;
                state.errors = null;
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
});

const {actions, reducer: movieReducer} = slice;
const movieActions = {
    ...actions,
    getAllMovies,
    getPopularMovies,
    selectMovieByGenre
};

export {
    movieActions,
    movieReducer
};
