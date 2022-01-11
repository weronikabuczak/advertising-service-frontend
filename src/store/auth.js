import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
    getAnotherUserApiCall,
    getUserApiCall,
    loginUserApiCall, registerUserApiCall, updatePasswordApiCall, updateUserApiCall,
} from './thunks/auth-thunks';

export const sliceName = 'auth';

export const initialState = {
    token: '',
    expirationTime: 0,
    remainingTime: 0,
    isLoggedIn: false,
    isLoading: false,
    user: {},
    anotherUser: {},
    email: '',
    setOpen: false
};

export const loginUser = createAsyncThunk(`${sliceName}/login`, async ({email, password}, {dispatch}) => {
    try {
        const data = await loginUserApiCall({email, password});
        const {token, remainingTime} = data;
        const {receivedEmail} = data;
        setTimeout(() => {
            dispatch(logoutUser({}))
        }, remainingTime);
        return {
            token: token,
            email: receivedEmail,
            isLoggedIn: true,
            remainingTime: remainingTime,
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
        const {token, remainingTime} = data;
        setTimeout(() => {
            dispatch(logoutUser({}))
        }, remainingTime);
        return {
            token: token,
            isLoggedIn: true,
            remainingTime: remainingTime
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

export const getAnotherUser = createAsyncThunk(`${sliceName}/getAnotherUser`, async ({token, email}, {dispatch}) => {
    try {
        const data = await getAnotherUserApiCall({token, email});
        // if (data.image) {
        //     let avatar = "data:image/jpeg;base64," + data.image;
        //     data.image = avatar;
        // }
        return {
            anotherUser: data
        };

    } catch (error) {
        alert('Cannot fetch user');
        throw error;
    }
});

export const updatePassword = createAsyncThunk(`${sliceName}/updatePassword`, async ({
                                                                                         token,
                                                                                         email,
                                                                                         currentPassword,
                                                                                         newPassword
                                                                                     }, {dispatch}) => {
    try {
        const data = await updatePasswordApiCall({token, email, currentPassword, newPassword});
        return {
            data
        };
    } catch (error) {
        alert('Cannot update password');
        throw error;
    }
});

export const updateUser = createAsyncThunk(`${sliceName}/updateUser`, async ({
                                                                                 token,
                                                                                 email,
                                                                                 phoneNumber,
                                                                                 name,
                                                                                 location
                                                                             }, {dispatch}) => {
    try {
        const data = await updateUserApiCall({token, email, phoneNumber, name, location});
        return {
            data
        };
    } catch (error) {
        alert('Cannot update user');
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
            const {email, token, remainingTime} = payload;
            state.token = token;
            state.isLoggedIn = true;
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
            state.remainingTime = null;
            state.isLoading = false;
        });

        builder.addCase(logoutUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
        });

        builder.addCase(getUser.pending || getAnotherUser.pending, (state) => {
            state.isLoading = true;
            state.isLoggedIn = true;
        });

        builder.addCase(getUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            const {user} = payload;
            state.user = user;
        });

        builder.addCase(getAnotherUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            const {anotherUser} = payload;
            state.anotherUser = anotherUser;
        });

        builder.addCase(getUser.rejected || getAnotherUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
        });


        builder.addCase(updatePassword.pending || updateUser.pending, (state) => {
            state.isLoading = true;
            state.setOpen = true;
        });

        builder.addCase(updatePassword.fulfilled || updateUser.fulfilled, (state, {}) => {
            state.isLoading = false;
            state.setOpen = false;
        });

        builder.addCase(updatePassword.rejected || updateUser.rejected, (state) => {
            state.isLoading = false;
            state.setOpen = true;
        });

    }
});


export const isUserLoggedIn = state => state[sliceName].isLoggedIn;
export const getUserToken = state => state[sliceName].token;
export const getUserInfo = state => state[sliceName].user;
export const getAnotherUserInfo = state => state[sliceName].anotherUser;
export const getUserEmail = state => state[sliceName].email;
export const getUserLoading = state => state[sliceName].isLoading;
export const getSetOpen = state => state[sliceName].setOpen;

export default auth.reducer;
