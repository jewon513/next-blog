import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type CommonState = {
  mode:"light" | "dark"
  drawerOpen:boolean
  loading:boolean
}

const commonInitState:CommonState = {
  mode:"light",
  drawerOpen:false,
  loading:true
}

const commonReducer = createSlice({
  name:"common",
  initialState: commonInitState,
  reducers:{
    setTheme: (state, action:PayloadAction<typeof commonInitState.mode>) => {
      state.mode = action.payload
      state.loading = false
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen
    },
    setLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

const {actions, reducer} = commonReducer

export const commonActions = actions
export default reducer