import {combineReducers} from "@reduxjs/toolkit";
import auth from './auth'
import task from "./task";
import offer from "./offer";

const rootReducer = combineReducers({
    auth,
    task,
    offer
});

export default rootReducer;
