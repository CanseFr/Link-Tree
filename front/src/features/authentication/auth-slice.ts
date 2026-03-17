import {createSlice} from '@reduxjs/toolkit'
import {jwtDecode, JwtPayload} from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  userId: number | undefined;
  role: string | undefined;
  firstname: string | undefined;
  pictureUrl: string | undefined;
}

const initialState: DecodedToken = {
  userId: undefined,
  role: undefined,
  firstname: undefined,
  pictureUrl: undefined,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setRoleOnLogin(state, action) {
      try {
        const decoded = jwtDecode<DecodedToken>(action.payload);
        state.userId = decoded.userId;
        state.role = decoded.role;
        localStorage.setItem("token", action.payload)
      } catch (err) {
        console.log(err);
      }
    },
    setUserLightInfoOnLogin(state, action) {
      try {
        state.firstname = action.payload.firstname;
        state.pictureUrl = action.payload.pictureUrl;
        // localStorage.setItem("firstname", action.payload.firstname)
        // localStorage.setItem("pictureUrl", action.payload.pictureUrl)
      } catch (err) {
        console.log(err);
      }
    },
    logout(state) {
      localStorage.clear()
      state.role = undefined;
      state.userId = undefined;
      state.firstname = undefined;
      state.pictureUrl = undefined;
    }
  },
})

export const {setRoleOnLogin, logout, setUserLightInfoOnLogin} = authenticationSlice.actions;
export default authenticationSlice.reducer;
