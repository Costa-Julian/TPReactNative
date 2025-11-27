import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    intems : [],
    status : 'idle',
    error : null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await fetch('https://reqres.in/api/users?page=1');
        if(!response.ok){
            throw new Error('Error al obtener usuarios.');
        }
        const data = await response.json();
        return data.data;
    }
) ;

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending,(state) => {
                state.status = 'loading',
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                action.error.message || 'Error al obtener usuarios';
            });
    },
});
export default usersSlice.reducer;