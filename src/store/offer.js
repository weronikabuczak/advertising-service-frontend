import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOfferApiCall, getOffersApiCall, updateOfferApiCall} from "./thunks/offer-thunks";
import {getExpirationTimeFromToken, getRemainingTimeFromToken, registerUserApiCall} from "./thunks/auth-thunks";
import {loginUser, logoutUser, registerUser} from "./auth";

export const sliceName = 'offer';

export const initialState = {
    offers: [],
    // currentTaskId: '',
    isLoading: false,
};

export const createOffer = createAsyncThunk(`${sliceName}/createOffer`, async ({
                                                                                   token, taskId
                                                                               }, {dispatch}) => {
    try {
        const data = await createOfferApiCall({token, taskId});
        // const {token} = data;
        return {
            data
        };
    } catch (error) {
        alert('Cannot create offer');
        throw error;
    }
});

export const getOffers = createAsyncThunk(`${sliceName}/getOffers`, async ({
                                                                               token, taskId, offerStatus
                                                                           }, {dispatch}) => {
    try {
        const data = await getOffersApiCall({token, taskId, offerStatus});
        return {
            offers: data
        };
    } catch (error) {
        alert('Cannot get offers');
        throw error;
    }
});

export const updateOffer = createAsyncThunk(`${sliceName}/updateOffer`, async ({
                                                                                   token, taskId, status
                                                                               }, {dispatch}) => {
    try {
        const data = await updateOfferApiCall({token, taskId, status});
        // const {token} = data;
        return {
            // token: token,
            // isLoggedIn: true,
            // expirationTime: getExpirationTimeFromToken(token),
            // remainingTime: getRemainingTimeFromToken(token),
        };
    } catch (error) {
        alert('Cannot update offers');
        throw error;
    }
});

const offer = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOffers.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getOffers.fulfilled, (state, {payload}) => {
            const {offers} = payload;
            state.offers = offers;
            state.isLoading = false;
        });
        builder.addCase(getOffers.rejected, (state) => {
            state.isLoading = false;
        });
    }
});


export const getAllOffers = state => state[sliceName].offers;

export default offer.reducer;

