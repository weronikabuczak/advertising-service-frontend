import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOfferApiCall, getOffersApiCall, updateOfferApiCall} from "./thunks/offer-thunks";
import {getTasks} from "./task";

export const sliceName = 'offer';

export const initialState = {
    offers: [],
    currentOffer: {},
};

export const createOffer = createAsyncThunk(`${sliceName}/createOffer`, async ({
                                                                                   token, taskId
                                                                               }, {dispatch}) => {
    try {
        const data = await createOfferApiCall({token, taskId});
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
            offers: data.map(offer => {
                if (offer.user.image) {
                    let avatar = "data:image/jpeg;base64," + offer.user.image;
                    offer.user.image = avatar;
                }
                return offer
            })
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
        dispatch(getTasks({isUserTasks: true, token}))
        return {
            ...data
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

        });
        builder.addCase(createOffer.fulfilled, (state, {payload}) => {
            const {id} = payload;
            state.offerId = id;

        });
        // builder.addCase(createOffer.rejected, (state) => {
        //     state.isLoading = false;
        // });
        //
        // builder.addCase(getOffers.pending, (state) => {
        //     state.isLoading = true;
        // });

        builder.addCase(getOffers.fulfilled, (state, {payload}) => {
            const {offers} = payload;
            state.offers = offers;
        });
        // builder.addCase(getOffers.rejected, (state) => {
        //     state.isLoading = false;
        // });
        // builder.addCase(updateOffer.pending, (state) => {
        //     state.isLoading = true;
        // });

        builder.addCase(updateOffer.fulfilled, (state, {payload}) => {
            const {id} = payload;
            state.offers = [...state.offers.filter(offer => offer.id === id), {...payload}]
        });

        // builder.addCase(updateOffer.rejected, (state) => {
        //     state.isLoading = false;
        // });
    }
});

export const getAllOffers = state => state[sliceName].offers;

export default offer.reducer;

