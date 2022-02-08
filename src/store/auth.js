import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
    deleteUserImageApiCall, getAllUsersEmailApiCall, getAllUsersEmailsApiCall,
    getAnotherUserApiCall, getMeApiCall,
    getUserApiCall,
    loginUserApiCall, registerUserApiCall, updatePasswordApiCall, updateUserApiCall, updateUserImageApiCall,
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
    setOpen: false,
    role: '',
    usersEmails: [],
    isLoginError: false,
    isRegistrationError: false,
    currentUserEmail: ''
};

export const loginUser = createAsyncThunk(`${sliceName}/login`, async ({email, password}, {dispatch}) => {
    try {
        const data = await loginUserApiCall({email, password});
        const {token, remainingTime, role, hasError} = data;
        const {receivedEmail} = data;
        setTimeout(() => {
            dispatch(logoutUser({}))
        }, remainingTime);
        return {
            token: token,
            email: receivedEmail,
            isLoggedIn: true,
            remainingTime: remainingTime,
            role: role
        };
    } catch (error) {
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
        const {token, remainingTime, receivedEmail, role} = data;
        setTimeout(() => {
            dispatch(logoutUser({}))
        }, remainingTime);
        return {
            token: token,
            isLoggedIn: true,
            remainingTime: remainingTime,
            email: receivedEmail,
            role: role
        };
    } catch (error) {
        // alert('Cannot fetch user');
        throw error;
    }
});

export const logoutUser = createAsyncThunk(`${sliceName}/logout`, async ({dispatch}) => {
    return {
        token: null,
        isLoggedIn: false,
        expirationTime: null,
        remainingTime: null,
    };
});

export const getMe = createAsyncThunk(`${sliceName}/getMe`, async ({token}, {dispatch}) => {
    try {
        const data = await getMeApiCall({token});
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

export const getUser = createAsyncThunk(`${sliceName}/getUser`, async ({token, email}, {dispatch}) => {
    try {
        const data = await getUserApiCall({token, email});
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
        if (data.image) {
            let avatar = "data:image/jpeg;base64," + data.image;
            data.image = avatar;
        }
        return {
            anotherUser: data
        };

    } catch (error) {
        alert('Cannot fetch user');
        throw error;
    }
});

export const getAllUsersEmails = createAsyncThunk(`${sliceName}/getAllUsersEmail`, async ({token}, {dispatch}) => {
    try {
        const data = await getAllUsersEmailsApiCall({token});
        return {
            usersEmails: [...data]
        };

    } catch (error) {
        alert('Cannot fetch emails');
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
        dispatch(getUser({token, email}));
        return {
            data
        };
    } catch (error) {
        alert('Cannot update user');
        throw error;
    }
});

export const updateUserImage = createAsyncThunk(`${sliceName}/updateUserImage`, async ({
                                                                                           token,
                                                                                           image,
                                                                                           email
                                                                                       }, {dispatch}) => {
    try {
        const data = await updateUserImageApiCall({token, image, email});
        dispatch(getUser({token, email}));
        return {
            data
        };

    } catch (error) {
        alert('Cannot update user image');
        throw error;
    }
});

export const deleteUserImage = createAsyncThunk(`${sliceName}/deleteUserImage`, async ({
                                                                                           token,
                                                                                           email
                                                                                       }, {dispatch}) => {
    try {
        await deleteUserImageApiCall({token, email});
        dispatch(getUser({token, email}));

    } catch (error) {
        throw error;
    }
});



const loginOrRegisterBuilderHandler = (state, {payload}) => {
    const {email, token, remainingTime, role} = payload;
    state.token = token;
    state.isLoggedIn = true;
    state.remainingTime = remainingTime;
    state.isLoading = false;
    state.email = email;
    state.role = role;
    state.isLoginError = false;
    state.isRegistrationError = false;
};

const auth = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setCurrentUserEmail: (state, {payload}) => {
            state.currentUserEmail = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending || registerUser.pending, (state) => {
            state.isLoading = true;
            state.isLoggedIn = false;
            state.isLoginError = false;
            state.isRegistrationError = false;
        });

        builder.addCase(loginUser.fulfilled, loginOrRegisterBuilderHandler);

        builder.addCase(registerUser.fulfilled, loginOrRegisterBuilderHandler);


        builder.addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.isLoginError = true;
            state.isRegistrationError = false;
        });

        builder.addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.isRegistrationError = true;
            state.isLoginError = false;
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

        builder.addCase(getMe.pending || getAnotherUser.pending || getAllUsersEmails.pending || getUser.pending, (state) => {
            state.isLoading = true;
            state.isLoggedIn = true;
        });

        builder.addCase(getMe.fulfilled || getUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            const {user} = payload;
            state.user = user;
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

        builder.addCase(getAllUsersEmails.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            const {usersEmails} = payload;
            state.usersEmails = usersEmails;
        });

        builder.addCase(getMe.rejected || getAnotherUser.rejected || getAllUsersEmails.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
        });


        builder.addCase(updatePassword.pending || updateUser.pending || updateUserImage.pending || deleteUserImage.pending, (state) => {
            state.isLoading = true;
            state.setOpen = true;
        });

        builder.addCase(updatePassword.fulfilled || updateUser.fulfilled || updateUserImage.fulfilled || deleteUserImage.fulfilled, (state) => {
            state.isLoading = false;
            state.setOpen = false;
        });

        builder.addCase(updatePassword.rejected || updateUser.rejected || updateUserImage.rejected || deleteUserImage.rejected, (state) => {
            state.isLoading = false;
            state.setOpen = true;
        });

    }
});

export const {setCurrentUserEmail} = auth.actions
// export const getCurrentUserEmail = (state) => state[sliceName].auth.find(user => user.email === state[sliceName].currentUserEmail);
export const getCurrentUserEmail = (state) => state[sliceName].currentUserEmail;
export const isUserLoggedIn = state => state[sliceName].isLoggedIn;
export const getUserToken = state => state[sliceName].token;
export const getUserInfo = state => state[sliceName].user;
export const getAnotherUserInfo = state => state[sliceName].anotherUser;
export const getUserEmail = state => state[sliceName].email;
// export const getUserLoading = state => state[sliceName].isLoading;
export const getSetOpen = state => state[sliceName].setOpen;
export const getRole = state => state[sliceName].role;
export const getUsersEmails = state => state[sliceName].usersEmails;
export const getLoginError = state => state[sliceName].isLoginError;
export const getRegistrationError = state => state[sliceName].isRegistrationError;

export default auth.reducer;
