import {LoginResult} from "../../query/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserState = {
  isLogin: boolean,
  userData: LoginResult
}

export const initUserState: UserState = {
  isLogin: false,
  userData: {
   user_id:"",
   user_no:0,
   user_name:"",
   user_role:""
  }
}

const userReducer = createSlice({
  name:'user',
  initialState: initUserState,
  reducers: {
    login: (state, action:PayloadAction<LoginResult>)=>{
      state.isLogin = true
      state.userData = action.payload
    },
    logout: (state)=>{
      state.isLogin = false
      state.userData = initUserState.userData
    }
  }
})

const {actions, reducer} = userReducer
export const userAction = actions
export default reducer