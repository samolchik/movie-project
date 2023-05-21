import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IMovie, IPagination, IVideo, IVideos} from "../../interfaces";
import { movieService} from "../../services";

interface IState {
    movies: IMovie[],
    videos:IVideo[] | null,
    page: number,
    totalPages: number,
    genreIds: number
    isLoading: boolean,
    errors: IError,

}

const initialState:IState = {
    movies: [],
    videos:null,
    page: 1,
    totalPages: null,
    genreIds: 0,
    isLoading: false,
    errors: null,
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

const getVideoById = createAsyncThunk<IVideos, number>(
    'movieSlice/getVideoById',
    async (id, {rejectWithValue})=> {
        try {
            const {data} = await movieService.getVideo(id);
            return data;
        }catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }

)

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

const searchMovieByGenre = createAsyncThunk<IPagination<IMovie[]>, { genreIds: number, page: number }>(
    'searchSlice/selectMovieByGenre',
    async ({genreIds, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.searchMoviesByGenreId(genreIds, page)
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
        setPage(state, action) {
            state.page = action.payload;
        },
        setGenreIds: (state,action)=>{
            state.genreIds = action.payload
        }

    },
    extraReducers: builder =>
        builder
            .addCase(getVideoById.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getVideoById.fulfilled, (state, action)=>{
                state.videos = action.payload.results
                state.isLoading = false
            })
            .addMatcher(isFulfilled(getAllMovies, getPopularMovies, searchMovieByGenre), (state, action) => {
                const {page, results, total_pages} = action.payload;
                state.movies = results;
                state.page = page;
                state.totalPages = total_pages;
                state.isLoading = false;
            })

            .addMatcher(isFulfilled(), state => {
                state.errors = null;
            })
            .addMatcher(isPending(), state => {
                state.isLoading = true;
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
    searchMovieByGenre,
    getVideoById
};

export {
    movieActions,
    movieReducer
};
