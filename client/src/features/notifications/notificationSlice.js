import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://timeflow-8vhk.onrender.com/api/notifications";

export const getNotifications = createAsyncThunk(
  "notifications/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Selector for unread count (assuming notification object has 'read' boolean)
export const selectUnreadCount = (state) =>
  state.notifications.notifications.filter((n) => !n.read).length;

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
