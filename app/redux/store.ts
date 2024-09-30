import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducers/counterReducer';
import authReducer from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: authReducer,
  },
});
