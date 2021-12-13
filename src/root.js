import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import rootReducer from "./store";

const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export const useAppDispatch = () => useDispatch();
export default store;