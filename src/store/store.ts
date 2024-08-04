import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsReducer from '@/store/contacts/slice'; // Убедитесь, что путь к файлу верный

const rootReducer = combineReducers({
  contacts: contactsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;