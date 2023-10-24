import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';
import counterSlice from './modules/counter';
import logger from 'redux-logger';

const reducer = combineReducers({
  counter: counterSlice,
});

const store = (context: Context) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
  });

export type Appstore = ReturnType<typeof store>;
export type Rootstate = ReturnType<Appstore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Rootstate,
  unknown,
  Action
>;

export const wrapper = createWrapper<Appstore>(store);
