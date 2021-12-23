import axios from "axios";
import {ApiState} from "../lib/types";
import {useEffect, useState} from "react";
import {PostEntity} from "../query/post";
import {useRouter} from "next/router";

const usePostWrite = ()=>{

  const router = useRouter()
  const [state, setState] = useState<ApiState>("idle")

  const submit = async (param:Partial<PostEntity>)=>{
    try{
      if(state !== "loading"){
        setState("loading")
        const res = await axios.post("/api/post",param)
        if(res.data.result === 1){
          setState("success")
        }else{
          setState("failure")
        }
      }
    }catch (e){
      setState("failure")
      console.error(e)
    }
  }

  useEffect(()=>{
    if(state === "success"){
      alert("등록 성공")
      router.replace("/")
    }
    if(state === "failure"){
      alert("등록 실패")
    }
  },[state])

  return [submit, state] as const

}

export default usePostWrite