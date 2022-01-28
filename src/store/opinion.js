import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOpinionApiCall, getOpinionApiCall} from "./thunks/opinion-thunks";
import { getOffers} from "./offer";

export const sliceName = 'opinion';

export const initialState = {
    opinion: {},
    isLoading: false,
};

export const createOpinion = createAsyncThunk(`${sliceName}/createOpinion`, async ({
                                                                                       token, offerId, rating, content, taskId
                                                                                   }, {dispatch}) => {
    try {
        const data = await createOpinionApiCall({token, offerId, rating, content});
        dispatch(getOffers({token, taskId, offerStatus: 'COMPLETED'}))
        return {
            data
        };
    } catch (error) {
        alert('Cannot create opinion');
        throw error;
    }
});

export const getOpinion = createAsyncThunk(`${sliceName}/getOpinion`, async ({
                                                                               token, offerId
                                                                           }, {dispatch}) => {
    try {
        const data = await getOpinionApiCall({token, offerId});
        console.log(offerId)
        return {
           opinion: data.data
        };
    } catch (error) {
        alert('Cannot get opinion');
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

        });
        builder.addCase(createOpinion.rejected, (state, {payload}) => {
            const {id} = payload;
            state.isLoading = false;
            state.opinion = [...state.opinion.filter( opinion => opinion.id === id), {...payload}]
        });
        builder.addCase(getOpinion.pending, (state) => {
            state.isLoading = true;

        });
        builder.addCase(getOpinion.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {opinion} = payload;
            state.opinion = opinion;

        });
        builder.addCase(getOpinion.rejected, (state) => {
            state.isLoading = false;
        });

    }
});

export const getOpinionForOffer = state => state[sliceName].opinion;

export default opinion.reducer;
