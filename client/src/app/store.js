import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import overtimeReducer from '../features/overtime/overtimeSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    overtime: overtimeReducer,
    notifications: notificationReducer,
  },
});
