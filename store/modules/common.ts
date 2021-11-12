import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type CommonState = {
  mode:"light" | "dark"
  drawerOpen:boolean
}

const commonInitState:CommonState = {
  mode:"light",
  drawerOpen:false
}

const commonReducer = createSlice({
  name:"common",
  initialState: commonInitState,
  reducers:{
    setTheme: (state, action:PayloadAction<typeof commonInitState.mode>) => {
      state.mode = action.payload
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen
    }
  }
})

const {actions, reducer} = commonReducer

export const commonActions = actions
export default reducer