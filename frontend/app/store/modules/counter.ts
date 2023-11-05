import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';
import { Rootstate } from '..';

export interface CounterState {
  number: number;
}

const initialState: CounterState = {
  number: 0,
};

export const counterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.number += 1;
    },
    decrement: (state) => {
      state.number -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.number += action.payload;
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     if (!action.payload.counter.number) {
  //       return state;
  //     }
  //     console.log('HYDRATE', action.payload.counter.number);
  //     state.number = action.payload.counter.number;
  //   },
  // },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export const selectCounter = (state: Rootstate) => state.counter;
export default counterSlice.reducer;
