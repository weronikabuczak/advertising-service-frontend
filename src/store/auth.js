import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
    getExpirationTimeFromToken,
    getRemainingTimeFromToken,
    getUserFromToken, loginUserApiCall,
} from './thunks/auth-thunks';

export const sliceName = 'auth';

export const initialState = {
    token: '',
    expirationTime: 0,
    remainingTime: 0,
    isLoggedIn: false,
    isLoading: false,
};

export const getUser = createAsyncThunk(sliceName, async (_, {dispatch}) => {
    try {
        // const {token, exp} = await getUserFromApi();
        const {token, exp} = null;

        return {
            token: token,
            isLoggedIn: getUserFromToken(token),
            expirationTime: getExpirationTimeFromToken(token),
            remainingTime: getRemainingTimeFromToken(token),
        };
    } catch (error) {
        alert('Cannot fetch user');
        throw error;
    }
});

export const loginUser = createAsyncThunk(`${sliceName}/login`, async ({email, password}, {dispatch}) => {
    try {
        const data = await loginUserApiCall({email, password});
        const {token} = data;
        return {
            token: token,
            isLoggedIn: getUserFromToken(token),
            expirationTime: getExpirationTimeFromToken(token),
            remainingTime: getRemainingTimeFromToken(token),
        };
    } catch (error) {
        alert('Cannot fetch user');
        throw error;
    }
});

const auth = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            const {token, user, expirationTime, remainingTime} = payload;
            state.token = token;
            state.isLoggedIn = true;
            state.expirationTime = expirationTime;
            state.remainingTime = remainingTime;
            state.isLoading = false;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        });
    }
});


export const isUserLoggedIn = state => state[sliceName].isLoggedIn;
export const getUserToken = state => state[sliceName].token


export default auth.reducer;
