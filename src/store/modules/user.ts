import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  profileImage: string;
  nickname: string;
}

const initialState = {
  profileImage: '',
  nickname: '',
  isAuthenticated: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.profileImage = '';
      state.nickname = '';
      state.isAuthenticated = false;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const { profileImage, nickname } = action.payload;
      state.profileImage = profileImage;
      state.nickname = nickname;
      state.isAuthenticated = true;
    },
  },
});

export const { setUserInfo, login, logout } = user.actions;
export default user.reducer;
