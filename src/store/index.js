import {combineReducers} from "@reduxjs/toolkit";
import auth from './auth'
import task from "./task";
import offer from "./offer";
import opinion from "./opinion";

const rootReducer = combineReducers({
    auth,
    task,
    offer,
    opinion
});

export default rootReducer;
