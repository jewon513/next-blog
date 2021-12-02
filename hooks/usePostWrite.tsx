import {PostParam} from "../query/post";
import axios from "axios";
import {ApiState} from "../lib/types";
import {useState} from "react";

const usePostWrite = ()=>{

  const [state, setState] = useState<ApiState>("idle")

  const submit = async (param:PostParam)=>{
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

  return submit

}

export default usePostWrite