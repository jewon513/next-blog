import sample from "./modules/sample";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {AnyAction, CombinedState, combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"
import rootSagas from "./sagas";
import common from "./modules/common";
import user from "./modules/user"

const rootReducer = combineReducers({
  sample,
  common,
  user
})

const reducer = (state:CombinedState<any>, action:AnyAction)=>{
  if(action.type === HYDRATE){
    return {
      ...state,
      ...action.payload
    }
  }
  return rootReducer(state, action)
}

const createStore = ()=>{
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(sagaMiddleware);
    }
  })

  sagaMiddleware.run(rootSagas)

  return store
}

export type AppState = ReturnType<typeof rootReducer> ;
const wrapper = createWrapper(createStore)

export default wrapper