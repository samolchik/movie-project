import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IError, IMovie, IPagination, ISearch} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    searchMovies: IMovie[];
    page: number,
    numOfPages: number,
    errors: IError,
}

const initialState: IState = {
    searchMovies: [],
    page: null,
    numOfPages: null,
    errors: null
};

const getSearchMovie = createAsyncThunk<IPagination<IMovie[]>, ISearch>(
    'searchSlice/getSearchMovie',
    async ({searchText, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getSearch(page, searchText)
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
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getSearchMovie.fulfilled, (state, action) => {
                const {page, results, total_pages} = action.payload;
                state.searchMovies = results;
                state.page = page;
                state.numOfPages = total_pages;

            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
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