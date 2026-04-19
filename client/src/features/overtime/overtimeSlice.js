import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/overtime';

export const getMyRequests = createAsyncThunk('overtime/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_URL}/my-requests`, config);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const overtimeSlice = createSlice({
    name: 'overtime',
    initialState: { requests: [], isError: false, isSuccess: false, isLoading: false, message: '' },
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyRequests.pending, (state) => { state.isLoading = true; })
            .addCase(getMyRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.requests = action.payload;
            })
            .addCase(getMyRequests.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = overtimeSlice.actions;
export default overtimeSlice.reducer;
