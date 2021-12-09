import {useState} from "react";
import {ApiState} from "../lib/types";
import axios from "axios";
import {useRouter} from "next/router";

const useDeletePost = ()=>{

  const router = useRouter()
  const [state, setState] = useState<ApiState>("idle")

  const delPost = async ()=>{
    try{
      if(state !== "loading"){
        setState("loading")
        const result = await axios.delete(`/api/post?postNo=${router.query.postNo}`)
        setState("success")
        await router.replace("/")
      }
    }catch (e){
      console.error(e)
      setState("failure")
    }
  }

  return [delPost, state] as const
}

export default useDeletePost