import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

interface UserState {
  firstName: string;
  lastName: string;
  moduleList: string[];
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  moduleList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ firstName: string; lastName: string, moduleList: string[] }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.moduleList = action.payload.moduleList
    },
    clearUser: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.moduleList = [];
    },
  },
});

export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;
export const selectUserModuleList = (state: RootState) => state.user.moduleList;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
