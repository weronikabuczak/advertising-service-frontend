import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./root";
import './i18n';

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="Loading...">
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);