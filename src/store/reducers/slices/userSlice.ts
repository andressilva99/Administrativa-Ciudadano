import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface UserState {
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser: (state) => {
      state.firstName = '';
      state.lastName = '';
    },
  },
});

export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
