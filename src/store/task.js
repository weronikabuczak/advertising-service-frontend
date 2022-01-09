import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {deleteTaskApiCall, getTasksApiCall} from "./thunks/task-thunks";

export const sliceName = 'task';

export const initialState = {
    tasks: [],
    currentTaskId: '',
    isLoading: false,
};

export const getTasks = createAsyncThunk(`${sliceName}/getTasks`, async ({isUserTasks, token, category, status}, {dispatch}) => {
    try {
        const data = await getTasksApiCall({isUserTasks, token, category, status});

        return {
            tasks: data.map(task => {
                if (task.image) {
                    let avatar = "data:image/jpeg;base64," + task.image;
                    task.image = avatar;
                }
                return task
            })
        };

    } catch (error) {
        alert('Cannot fetch tasks');
        throw error;
    }
});

export const deleteTask = createAsyncThunk(`${sliceName}/deleteTask`, async ({id, token}, {dispatch}) => {
    try {
        await deleteTaskApiCall({id, token});
    } catch (error) {
        // alert('Cannot delete task');
        //todo
        throw error;
    }
});


const task = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setCurrentTaskId: (state, {payload})  => {
            state.currentTaskId = payload
        }
    },
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
export const {setCurrentTaskId} = task.actions
export const getIsLoading = state => state[sliceName].isLoading;
export const getAllTasks = state => state[sliceName].tasks;
export const getCurrentTask = (state) => state[sliceName].tasks.find(task => task.id === state[sliceName].currentTaskId);

export default task.reducer;