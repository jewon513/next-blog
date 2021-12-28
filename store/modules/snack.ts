import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AlertColor} from "@mui/material";

export type Snack = {
  duration: number
  id: string
  msg: string
  open: boolean,
  severity: AlertColor
}

const snackInitState:Snack = {
  id: "",
  msg: "",
  open: true,
  severity: "info",
  duration: 2000
}


const snackReducer = createSlice({
  name:"snack",
  initialState: snackInitState,
  reducers:{
    setSnack: (state, action:PayloadAction<Pick<Snack, "msg" | "severity">>)=>{
      state.msg = action.payload.msg
      state.severity = action.payload.severity
      state.id = `${new Date().getDate() + Math.random()}`
    },
    resetSnack: (state)=>{
      return snackInitState
    }
  }
})

const {actions, reducer} = snackReducer

export const snackActions = actions
export default reducer