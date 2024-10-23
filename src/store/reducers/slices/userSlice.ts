import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface UserState {
  firstName: string;
  lastName: string;
  permissions: string[];
  root: boolean;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  permissions: [],
  root: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ firstName: string; lastName: string, permissions: string[], root: boolean }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.permissions = action.payload.permissions;
      state.root = action.payload.root;
    },
    clearUser: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.permissions = [];
      state.root = false;
    },
  },
});

export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;
export const selectUserPermissions = (state: RootState) => state.user.permissions;
export const selectUserRoot = (state: RootState) => state.user.root;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
