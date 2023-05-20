import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';

import App from './App';
import {setupStore} from "./redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

