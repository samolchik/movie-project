import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {genreReducer, movieReducer} from "./slices";
import {searchReducer} from "./slices/search.slice";

const rootReducer = combineReducers({
    movieReducer,
    genreReducer,
    searchReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
};

export {
    setupStore
};
