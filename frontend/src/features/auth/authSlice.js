import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'authSlice',
  initialState: {user: null, token:null},
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
    }
  },
})

export const { loginUser } = authSlice.actions
export default authSlice.reducer