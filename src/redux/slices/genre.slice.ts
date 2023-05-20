import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IGenre} from "../../interfaces";
import {genreService} from "../../services";
import {IGenres} from "../../interfaces/genres.inerface";

interface IState {
    genres: IGenre[];
    selectedGenre: IGenre | null,
    errors: IError,
}

const initialState: IState = {
    genres: [],
    selectedGenre: null,
    errors: null
};

const getAllGenre = createAsyncThunk<IGenres<IGenre[]>, void>(
    'genreSlice/getAllGenre',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllGenre.fulfilled, (state, action) => {
                const {genres} = action.payload;
                state.genres = genres;
            })
            .addMatcher(isFulfilled(), state => {
                state.errors = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload;
            })
});

const {actions, reducer: genreReducer} = slice;
const genreActions = {
    ...actions,
    getAllGenre
};

export {
    genreActions,
    genreReducer
};
