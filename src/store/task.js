import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    createTaskApiCall,
    deleteTaskApiCall,
    getAnotherUserCompletedTasksApiCall,
    getTasksApiCall,
    updateTaskApiCall
} from "./thunks/task-thunks";

export const sliceName = 'task';

export const initialState = {
    tasks: [],
    anotherUserTasks: [],
    currentTaskId: '',
    isLoading: false,
};

export const createTask = createAsyncThunk(`${sliceName}/createTask`, async ({
                                                                                 token,
                                                                                 title,
                                                                                 content,
                                                                                 category,
                                                                                 address,
                                                                                 pay,
                                                                                 expirationDate,
                                                                                 estimatedTime,
                                                                                 image,
                                                                                 longitude,
                                                                                 latitude
                                                                             }, {dispatch}) => {
    try {
        const data = await createTaskApiCall({
            token, title, content, category, address, pay, expirationDate, estimatedTime, image, longitude, latitude
        });
        return {
            data
        };
    } catch (error) {
        alert('Cannot create tasks');
        throw error;
    }
});

export const getTasks = createAsyncThunk(`${sliceName}/getTasks`, async ({
                                                                             isUserTasks,
                                                                             token,
                                                                             category,
                                                                             status
                                                                         }, {dispatch}) => {
    try {
        const data = await getTasksApiCall({isUserTasks, token, category, status});
        // const expirationDate = new Date(data.expirationDate);
        // data.expirationDate = expirationDate.toLocaleDateString();
        //
        // return {
        //     user: data
        // };

        return {
            tasks: data.map(task => {
                const expirationDate = new Date(task.expirationDate);
                task.expirationDate = expirationDate.toLocaleDateString();
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

export const getAnotherUserCompletedTasks = createAsyncThunk(`${sliceName}/getAnotherUserCompletedTasks`, async ({
                                                                                                                     token,
                                                                                                                     email
                                                                                                                 }, {dispatch}) => {
    try {
        const data = await getAnotherUserCompletedTasksApiCall({token, email});
        console.log(data)
        return {
            anotherUserTasks: data
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

export const updateTask = createAsyncThunk(`${sliceName}/updateTask`, async ({
                                                                                 token,
                                                                                 id,
                                                                                 title,
                                                                                 category,
                                                                                 content,
                                                                                 address,
                                                                                 pay,
                                                                                 expirationDate,
                                                                                 estimatedTime,
                                                                                 longitude,
                                                                                 latitude
                                                                             }, {dispatch}) => {
    try {
        const data = await updateTaskApiCall({
            token,
            id,
            title,
            category,
            content,
            address,
            pay,
            expirationDate,
            estimatedTime,
            longitude,
            latitude
        });
        return {
            data
        };
    } catch (error) {
        alert('Cannot update user');
        throw error;
    }
});


const task = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setCurrentTaskId: (state, {payload}) => {
            state.currentTaskId = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.pending || getTasks.pending || getAnotherUserCompletedTasks.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(createTask.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        });

        builder.addCase(createTask.rejected, (state, {payload}) => {
            state.isLoading = false;
        });

        builder.addCase(getTasks.fulfilled, (state, {payload}) => {
            const {tasks} = payload;
            state.tasks = tasks;
            state.isLoading = false;
        });

        builder.addCase(getAnotherUserCompletedTasks.fulfilled, (state, {payload}) => {
            const {anotherUserTasks} = payload;
            state.anotherUserTasks = anotherUserTasks;
            state.isLoading = false;
        });

        builder.addCase(getTasks.rejected || getAnotherUserCompletedTasks.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteTask.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(deleteTask.fulfilled, (state, {payload}) => {
            state.isLoading = false;
        });
        builder.addCase(deleteTask.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateTask.pending, (state) => {
            state.isLoading = true;
            state.setOpen = true;
        });

        builder.addCase(updateTask.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.setOpen = false;
        });
        builder.addCase(updateTask.rejected, (state) => {
            state.isLoading = false;
            state.setOpen = false;
        });
    }
});
export const {setCurrentTaskId} = task.actions
// export const getIsLoading = state => state[sliceName].isLoading;
export const getAllTasks = state => state[sliceName].tasks;
export const getAnotherUserTasks = state => state[sliceName].anotherUserTasks;
export const getCurrentTask = (state) => state[sliceName].tasks.find(task => task.id === state[sliceName].currentTaskId);
export const getSetOpenTask = state => state[sliceName].setOpen;

export default task.reducer;