import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
    getExpirationTimeFromToken,
    getRemainingTimeFromToken,
    loginUserApiCall, registerUserApiCall,
} from './thunks/auth-thunks';

export const sliceName = 'auth';

export const initialState = {
    token: '',
    expirationTime: 0,
    remainingTime: 0,
    isLoggedIn: false,
    isLoading: false,
};

export const loginUser = createAsyncThunk(`${sliceName}/login`, async ({email, password}, {dispatch}) => {
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

export const registerUser = createAsyncThunk(`${sliceName}/register`, async ({
                                                                                 email,
                                                                                 currentPassword,
                                                                                 newPassword,
                                                                                 name,
                                                                                 location,
                                                                                 phoneNumber,
                                                                                 image
                                                                             }, {dispatch}) => {
    try {
        const data = await registerUserApiCall({email, currentPassword,  newPassword, name, location, phoneNumber, image});
        const {token} = data;
        return {
            token: token,
            isLoggedIn: true,
            expirationTime: getExpirationTimeFromToken(token),
            remainingTime: getRemainingTimeFromToken(token),
        };
    } catch (error) {
        alert('Cannot fetch user');
        throw error;
    }
});

export const logoutUser = createAsyncThunk(`${sliceName}/logout`, async ({dispatch}) => {
    try {
        return {
            token: null,
            isLoggedIn: false,
            expirationTime: null,
            remainingTime: null,
        };
    } catch (error) {
        alert('Cannot logout');
        throw error;
    }
});


const auth = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending || registerUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loginUser.fulfilled || registerUser.fulfilled, (state, {payload}) => {
            const {token, expirationTime, remainingTime} = payload;
            state.token = token;
            state.isLoggedIn = true;
            state.expirationTime = expirationTime;
            state.remainingTime = remainingTime;
            state.isLoading = false;
        });
        builder.addCase(loginUser.rejected || registerUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        });

        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(logoutUser.fulfilled, (state, {payload}) => {
            state.token = null;
            state.isLoggedIn = false;
            state.expirationTime = null;
            state.remainingTime = null;
            state.isLoading = false;
        });

        builder.addCase(logoutUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
        });
    }
});


export const isUserLoggedIn = state => state[sliceName].isLoggedIn;
export const getUserToken = state => state[sliceName].token;

export default auth.reducer;
