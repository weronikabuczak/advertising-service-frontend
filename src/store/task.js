import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getTasksApiCall} from "./thunks/task-thunks";

export const sliceName = 'task';

export const initialState = {
    tasks: [],
    isLoading: false,
};

export const getTasks = createAsyncThunk(`${sliceName}/getTasks`, async ({isUserTasks, token}, {dispatch}) => {
    try {
        console.log(isUserTasks)
        console.log(token)
        const data = await getTasksApiCall({isUserTasks, token});
        console.log(data);
        //const {tasks} = data;
        return {
            tasks: [...data]
        };
    } catch (error) {
        alert('Cannot fetch tasks');
        throw error;
    }
});

const task = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getTasks.fulfilled, (state, {payload}) => {
            const {tasks} = payload;
            state.tasks = tasks;
            state.isLoading = false;
        });
        builder.addCase(getTasks.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const getIsLoading = state => state[sliceName].isLoading;
export const getAllTasks = state => state[sliceName].tasks;

export default task.reducer;