import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
    getExpirationTimeFromToken,
    getRemainingTimeFromToken, getUserApiCall,
    loginUserApiCall, registerUserApiCall,
} from './thunks/auth-thunks';
import {getTasksApiCall} from "./thunks/task-thunks";

export const sliceName = 'auth';

export const initialState = {
    token: '',
    expirationTime: 0,
    remainingTime: 0,
    isLoggedIn: false,
    isLoading: false,
    user: { },
    email: ''
};

export const loginUser = createAsyncThunk(`${sliceName}/login`, async ({email, password}, {dispatch}) => {
    try {
        const data = await loginUserApiCall({email, password});
        // console.log(user)
        const {token, exp} = data;
        const {receivedEmail} = data;
        return {
            token: token,
            email: receivedEmail,
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
        const data = await registerUserApiCall({
            email,
            currentPassword,
            newPassword,
            name,
            location,
            phoneNumber,
            image
        });
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

export const getUser = createAsyncThunk(`${sliceName}/getUser`, async ({token}, {dispatch}) => {
    try {
        const data = await getUserApiCall({token});
        console.log(data);
        const createDate = new Date(data.createDate);
        data.createDate = createDate.toLocaleDateString();
        if (data.image) {
            let avatar = "data:image/jpeg;base64," + data.image;
            data.image = avatar;
        }
        return {
            user: data
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
        builder.addCase(loginUser.pending || registerUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loginUser.fulfilled || registerUser.fulfilled, (state, {payload}) => {
            const {email, token, expirationTime, remainingTime} = payload;
            state.token = token;
            state.isLoggedIn = true;
            state.expirationTime = expirationTime;
            state.remainingTime = remainingTime;
            state.isLoading = false;
            state.email = email;
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

        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.isLoggedIn = true;
        });

        builder.addCase(getUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            const {user} = payload;
            state.user = user;
        });

        builder.addCase(getUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
        });
    }
});


export const isUserLoggedIn = state => state[sliceName].isLoggedIn;
export const getUserToken = state => state[sliceName].token;
export const getUserInfo = state => state[sliceName].user;
export const getUserEmail = state => state[sliceName].email;

export default auth.reducer;
