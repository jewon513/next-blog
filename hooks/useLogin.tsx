import axios from "axios";
import {useState} from "react";
import {ApiResult, ApiState} from "../lib/types";
import {LoginResult} from "../query/user";
import {useDispatch} from "react-redux";
import {userAction} from "../store/modules/user";

const useLogin = ()=>{

  const [state, setState] = useState<ApiState>("idle")
  const dispatch = useDispatch()

  const login = async(param:{user_id:string, user_pw:string})=>{
    if(state !== "loading"){
      setState("loading")
      axios.post<ApiResult<LoginResult>>("/api/login",param).then(res=>{
        const {data} = res
        alert(data.message)
        switch (data.code){
          case 0 :
            dispatch(userAction.logout())
            break;
          case 1 :
            dispatch(userAction.login(data.data))
            break;
        }
        setState("success")
      }).catch(e=>{
        console.log(e)
        setState("failure")
      })
    }
  }

  return [state, login] as const
}

export default useLogin;