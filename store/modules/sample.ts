import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type SampleState = {
  count : number,
  loading : boolean,
  error : boolean
}

const sampleInitState:SampleState = {
  count : 0,
  loading : false,
  error : false
}

const sampleReducer = createSlice({
  name:"sample",
  initialState: sampleInitState,
  reducers:{
    setLoading:(state, action:PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    upCount:(state, action:PayloadAction<number>) => {
      state.loading = true
    },
    downCount:(state, action:PayloadAction<number>) => {
      state.loading = true
    },
    upCountSuccess:(state, action:PayloadAction<number>) => {
      state.count += action.payload
      state.loading = false
    },
    upCountFailure:(state, action:PayloadAction<boolean>) => {
      state.error = action.payload
      state.loading = false
    },
    downCountSuccess:(state, action:PayloadAction<number>) => {
      state.count -= action.payload
      state.loading = false
    },
    downCountFailure:(state, action:PayloadAction<boolean>) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

const {actions, reducer} = sampleReducer

export const sampleActions = actions
export default reducer