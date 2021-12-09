import axios from "axios";
import {ApiState} from "../lib/types";
import {useState} from "react";
import {PostEntity} from "../query/post";

const usePostWrite = ()=>{

  const [state, setState] = useState<ApiState>("idle")

  const submit = async (param:Partial<PostEntity>)=>{
    try{
      if(state !== "loading"){
        setState("loading")
        const result = await axios.post("/api/post",param)
        setState("success")
        return result
      }
    }catch (e){
      setState("failure")
      console.error(e)
    }
  }

  return [submit, state] as const

}

export default usePostWrite