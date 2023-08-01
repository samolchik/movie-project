import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IMovie, IPagination, IVideo, IVideos} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovie[],
    videos: IVideo[] | null,
    page: number,
    totalPages: number,
    searchText: string,
    selectGenre: number,
    selectYear: string,
    filterMovies: string,
    isLoading: boolean,
    errors: IError,

}

const initialState: IState = {
    movies: [],
    videos: null,
    page: 1,
    totalPages: null,
    searchText: '',
    selectGenre: 0,
    selectYear: '',
    filterMovies: '',
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
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getVideo(id);
            return data;
        } catch (e) {
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

const searchMovies = createAsyncThunk<IPagination<IMovie[]>, { searchText: string, page: number }>(
    'movieSlice/searchMovie',
    async ({searchText, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getSearch(searchText, page)
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const searchMovieByGenre = createAsyncThunk<IPagination<IMovie[]>, { genreIds: number, page: number }>(
    'movieSlice/selectMovieByGenre',
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

const selectMoviesByYear = createAsyncThunk<IPagination<IMovie[]>, { year: number, page: number }>(
    'movieSlice/selectMoviesByYear',
    async ({year, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getSelectByYear(year, page)
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    })

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setSearchText: (state, action)=> {
            state.searchText = action.payload;
        },
        setSelectGenre: (state, action) => {
            state.selectGenre = action.payload
        },
        setSelectYear: (state, action) => {
            state.selectYear = action.payload
        },
        setFilterMovies: (state, action) => {
            state.filterMovies = action.payload
        }


    },
    extraReducers: builder =>
        builder
            .addCase(getVideoById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getVideoById.fulfilled, (state, action) => {
                state.videos = action.payload.results
                state.isLoading = false
            })
            .addMatcher(isFulfilled(getAllMovies, getPopularMovies,searchMovies, searchMovieByGenre, selectMoviesByYear), (state, action) => {
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
    searchMovies,
    searchMovieByGenre,
    selectMoviesByYear,
    getVideoById
};

export {
    movieActions,
    movieReducer
};
