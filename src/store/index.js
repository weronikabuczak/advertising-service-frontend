import {combineReducers} from "@reduxjs/toolkit";
import auth from './auth'
import task from "./task";

const rootReducer = combineReducers({
    auth,
    task
});

export default rootReducer;
