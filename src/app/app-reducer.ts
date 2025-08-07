import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'light' as ThemeMode,
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeThemeMode(state, action: { payload: ThemeMode }) {
      state.themeMode = action.payload;
    },
  },
});

export type ThemeMode = 'dark' | 'light';

export const { changeThemeMode } = appReducer.actions;
export default appReducer.reducer;
