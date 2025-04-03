import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './profilesSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    profiles: profilesReducer,
    auth: authReducer,
  },
});
