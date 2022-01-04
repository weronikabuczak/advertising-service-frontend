import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOfferApiCall, getOffersApiCall, updateOfferApiCall} from "./thunks/offer-thunks";

export const sliceName = 'offer';

export const initialState = {
    offers: [],
    currentOfferId: '',
    isLoading: false,
    updateSuccess: false,
    postSuccess: false
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
                                                                                   token, offerId, offerStatus
                                                                               }, {dispatch}) => {
    try {
        const data = await updateOfferApiCall({token, offerId, offerStatus});
        return {
            data
        };
    } catch (error) {
        alert('Cannot update offers');
        throw error;
    }
});

const offer = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setCurrentOfferId: (state, {payload}) => {
            state.currentOfferId = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOffer.pending, (state) => {
            state.isLoading = true;
            state.postSuccess = false;

        });
        builder.addCase(createOffer.fulfilled, (state, {payload}) => {
            const {id} = payload;
            state.isLoading = false;
            state.offerId = id;
            state.postSuccess = true;

        });
        builder.addCase(createOffer.rejected, (state) => {
            state.isLoading = false;
            state.postSuccess = false;
        });

        builder.addCase(getOffers.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getOffers.fulfilled, (state, {payload}) => {
            const {offers} = payload;
            state.offers = offers;
            state.isLoading = false;
            state.updateSuccess = false;
        });
        builder.addCase(getOffers.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateOffer.pending, (state) => {
            state.isLoading = true;
            state.updateSuccess = false;
        });

        builder.addCase(updateOffer.fulfilled, (state, {payload}) => {
            const {offers} = payload;
            state.offers = offers;
            state.isLoading = false;
        });
        builder.addCase(updateOffer.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const {setCurrentOfferId} = offer.actions;
export const getCurrentOffer = (state) => state[sliceName].offers.find(offer => offer.id === state[sliceName].currentOfferId);
export const getCurrentOfferId = (state) => state[sliceName].currentOfferId;
export const getUpdateSuccess = (state) => state[sliceName].updateSuccess;
export const getPostSuccess = (state) => state[sliceName].postSuccess;
export const getAllOffers = state => state[sliceName].offers;

export default offer.reducer;

