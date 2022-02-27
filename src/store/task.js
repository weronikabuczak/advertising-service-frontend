import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    createTaskApiCall,
    deleteTaskApiCall, deleteTaskImageApiCall,
    getAnotherUserCompletedTasksApiCall,
    getTasksApiCall,
    updateTaskApiCall, updateTaskImageApiCall
} from "./thunks/task-thunks";


export const sliceName = 'task';

export const initialState = {
    tasks: [],
    task: {},
    anotherUserTasks: [],
    currentTaskId: '',
    setOpen: false,
    allTasksId: []
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
        dispatch(getTasks({token, isUserTasks: true}))
        return {
            data
        };
    } catch (error) {
        alert('Cannot update task')
        throw error;
    }
});

export const updateTaskImage = createAsyncThunk(`${sliceName}/updateTaskImage`, async ({
                                                                                           token,
                                                                                           image,
                                                                                           id
                                                                                       }, {dispatch}) => {
    try {
        const data = await updateTaskImageApiCall({token, image, id});
        dispatch(getTasks({token, isUserTasks: true}))
        return {
            data
        };

    } catch (error) {
        alert('Cannot update task image');
        throw error;
    }
});

export const deleteTaskImage = createAsyncThunk(`${sliceName}/deleteTaskImage`, async ({
                                                                                           token,
                                                                                           id
                                                                                       }, {dispatch}) => {
    try {
        await deleteTaskImageApiCall({token, id});
        dispatch(getTasks({token, isUserTasks: true}))
        dispatch(({token}));

    } catch (error) {
        throw error;
    }
});


const setOpenModalsTrue = (state, {payload}) => {
    state.setOpen = true;
}

const setOpenModalsFalse = (state, {payload}) => {
    state.setOpen = false;
}

const task = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setCurrentTaskId: (state, {payload}) => {
            state.currentTaskId = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state, {payload}) => {
            const {tasks} = payload;
            state.tasks = tasks;
        });

        builder.addCase(getAnotherUserCompletedTasks.fulfilled, (state, {payload}) => {
            const {anotherUserTasks} = payload;
            state.anotherUserTasks = anotherUserTasks;
        });

        builder.addCase(updateTask.pending, setOpenModalsTrue);
        builder.addCase(updateTaskImage.pending, setOpenModalsTrue);
        builder.addCase(deleteTaskImage.pending, setOpenModalsTrue);
        builder.addCase(updateTask.fulfilled, setOpenModalsFalse);
        builder.addCase(updateTask.rejected, setOpenModalsFalse);
        builder.addCase(updateTaskImage.fulfilled, setOpenModalsFalse);
        builder.addCase(updateTaskImage.rejected, setOpenModalsFalse);
        builder.addCase(deleteTaskImage.fulfilled, setOpenModalsFalse);
        builder.addCase(deleteTaskImage.rejected, setOpenModalsFalse);
    }
});
export const {setCurrentTaskId} = task.actions
export const getAllTasks = state => state[sliceName].tasks;
export const getAnotherUserTasks = state => state[sliceName].anotherUserTasks;
export const getCurrentTask = (state) => state[sliceName].tasks.find(task => task.id === state[sliceName].currentTaskId);
export const getSetOpenTask = state => state[sliceName].setOpen;
export default task.reducer;