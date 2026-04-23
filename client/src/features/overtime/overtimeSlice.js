import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/overtime';

// Fetch all employees with grouped requests
export const fetchEmployees = createAsyncThunk('overtime/fetchEmployees', async () => {
    try {
        const res = await axios.get(`${API_URL}/employees`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error(error);
    }
})

export const fetchRequest = createAsyncThunk('overtime/fetchRequest', async () => {
    try {
        const res = await axios.get(`${API_URL}/my-requests`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error(error);
    }
});

// Get employee's requests


// Approve request
export const approveRequest = createAsyncThunk('overtime/approveRequest', async (reqId, thunkAPI) => {
    try {
        await axios.put(`${API_URL}/${reqId}/process`, { action: 'approve' }, { withCredentials: true });
        return reqId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Reject request
export const rejectRequest = createAsyncThunk('overtime/rejectRequest', async (reqId, thunkAPI) => {
    try {
        await axios.put(`${API_URL}/${reqId}/process`, { action: 'reject' }, { withCredentials: true });
        return reqId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const initialState = {
    employees: [],       // current user's own requests (flat array)
    employeeList: [],    // authority view: all employees with nested requests
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

const overtimeSlice = createSlice({
    name: 'overtime',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.employeeList = action.payload || [];
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.employees = action.payload;
            })
            .addCase(fetchRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(approveRequest.fulfilled, (state, action) => {
                const reqId = action.payload;
                state.employees = state.employees.map(r =>
                    r.id === reqId ? { ...r, status: 'approved' } : r
                );
                // Also update the authority panel's nested requests
                state.employeeList = state.employeeList.map(emp => ({
                    ...emp,
                    requests: (emp.requests || []).map(r =>
                        String(r.id) === String(reqId) ? { ...r, status: 'approved' } : r
                    ),
                }));
            })
            .addCase(rejectRequest.fulfilled, (state, action) => {
                const reqId = action.payload;
                state.employees = state.employees.map(r =>
                    r.id === reqId ? { ...r, status: 'rejected' } : r
                );
                // Also update the authority panel's nested requests
                state.employeeList = state.employeeList.map(emp => ({
                    ...emp,
                    requests: (emp.requests || []).map(r =>
                        String(r.id) === String(reqId) ? { ...r, status: 'rejected' } : r
                    ),
                }));
            });
    },
});

// Selectors
export const selectEmployees = (state) => {
    // Sort: new requests first, then by latest activity
    const emps = [...state.overtime.employees];
    emps.sort((a, b) => {
        if (a.hasNewRequest && !b.hasNewRequest) return -1;
        if (!a.hasNewRequest && b.hasNewRequest) return 1;
        return new Date(b.lastActivity) - new Date(a.lastActivity);
    });
    return emps;
};
export const selectLoading = (state) => state.overtime.isLoading;

export const { reset } = overtimeSlice.actions;
export default overtimeSlice.reducer;
