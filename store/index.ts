import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {AnyAction, CombinedState, combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"
import rootSagas from "./sagas";
import common from "./modules/common";
import user from "./modules/user"
import snack from "./modules/snack"

const rootReducer = combineReducers({
  common,
  user,
  snack
})

const reducer = (state:CombinedState<any>, action:AnyAction)=>{
  if(action.type === HYDRATE){
    const data = {...action.payload}

    return {
      ...state,
      user : {
        isLogin: data.user.isLogin,
        userData: data.user.userData
      }
    }
  }else{
    return rootReducer(state, action)
  }
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