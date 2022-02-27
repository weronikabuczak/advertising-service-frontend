import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createOpinionApiCall, deleteOpinionApiCall, getOpinionApiCall} from "./thunks/opinion-thunks";
import {getOffers} from "./offer";

export const sliceName = 'opinion';

export const initialState = {
    opinion: {},
};

export const createOpinion = createAsyncThunk(`${sliceName}/createOpinion`, async ({
                                                                                       token,
                                                                                       offerId,
                                                                                       rating,
                                                                                       content,
                                                                                       taskId
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

export const deleteOpinion = createAsyncThunk(`${sliceName}/deleteOpinion`, async ({id, token}, {dispatch}) => {
    try {
        await deleteOpinionApiCall({id, token});
    } catch (error) {
        throw error;
    }
});

const opinion = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOpinion.rejected, (state, {payload}) => {
            const {id} = payload;
            state.opinion = [...state.opinion.filter(opinion => opinion.id === id), {...payload}]
        });
        builder.addCase(getOpinion.fulfilled, (state, {payload}) => {
            const {opinion} = payload;
            state.opinion = opinion;
        });
        builder.addCase(deleteOpinion.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteOpinion.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        });
        builder.addCase(deleteOpinion.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const getOpinionForOffer = state => state[sliceName].opinion;

export default opinion.reducer;
