import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IError, IMovie, IPagination} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    searchMovies: IMovie[];
    searchText: string,
    page: number,
    totalPages: number,
    errors: IError,
    isLoading: boolean
}

const initialState: IState = {
    searchMovies: [],
    searchText: null,
    page: 1,
    totalPages: null,
    errors: null,
    isLoading: false
};

const getSearchMovie = createAsyncThunk<IPagination<IMovie[]>, { searchText: string, page: number }>(
    'searchSlice/getSearchMovie',
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

const slice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setSearchText: (state, action)=> {
            state.searchText = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getSearchMovie.fulfilled, (state, action) => {
                const {page, results, total_pages} = action.payload;
                state.searchMovies = results;
                state.page = page;
                state.totalPages = total_pages;
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

const {actions, reducer: searchReducer} = slice;
const searchActions = {
    ...actions,
    getSearchMovie
};

export {
    searchActions,
    searchReducer
};