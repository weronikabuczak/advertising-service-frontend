import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOpinionApiCall} from "./thunks/opinion-thunks";
import {createOffer, getOffers, updateOffer} from "./offer";

export const sliceName = 'opinion';

export const initialState = {
    opinion: [],
    isLoading: false,
};

export const createOpinion = createAsyncThunk(`${sliceName}/createOpinion`, async ({
                                                                                       token, offerId, rating, content
                                                                                   }, {dispatch}) => {
    try {
        const data = await createOpinionApiCall({token, offerId, rating, content});
        return {
            data
        };
    } catch (error) {
        alert('Cannot create opinion');
        throw error;
    }
});

const opinion = createSlice({
    name: sliceName,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createOpinion.pending, (state) => {
            state.isLoading = true;

        });
        builder.addCase(createOpinion.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // state.opinion = payload;

        });
        builder.addCase(createOpinion.rejected, (state) => {
            state.isLoading = false;
        });

    }
});

export default opinion.reducer;
