import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRemainingTimeFromToken, loginUserApiCall} from "./thunks/auth-thunks";

export const sliceName = 'task';

export const initialState = {
    token: '',
    expirationTime: 0,
    remainingTime: 0,
    isLoggedIn: false,
    isLoading: false,
};

export const getTasks = createAsyncThunk(`${sliceName}/getTasks`, async ({email, password}, {dispatch}) => {
    try {
        const data = await loginUserApiCall({email, password});
        const {token, exp} = data;
        return {
            token: token,
            isLoggedIn: true,
            expirationTime: exp,
            remainingTime: getRemainingTimeFromToken(token),
        };
    } catch (error) {
        alert('Cannot fetch user');
        throw error;
    }
});