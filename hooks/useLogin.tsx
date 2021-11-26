import axios from "axios";
import {useState} from "react";
import {ApiState} from "../lib/types";
import {LoginResult} from "../pages/api/login";

const useLogin = ()=>{

  const [state, setState] = useState<ApiState>("idle")

  const login = async(param:{user_id:string, user_pw:string})=>{
    if(state !== "loading"){
      setState("loading")
      axios.post<LoginResult>("api/login",param).then(res=>{
        const {data} = res
        switch (data.code){
          case 0 :
            alert(data.message)
            break;
          case 1 :
            alert(data.message)
            break;
        }
        console.log(data.data)
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