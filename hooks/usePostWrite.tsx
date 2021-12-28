import axios from "axios";
import {ApiState} from "../lib/types";
import {useEffect, useState} from "react";
import {Post} from "../query/post";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {snackActions} from "../store/modules/snack";

const usePostWrite = ()=>{

  const router = useRouter()
  const dispatch = useDispatch()
  const [state, setState] = useState<ApiState>("idle")

  const submit = async (param)=>{
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
      dispatch(snackActions.setSnack({
        severity:"success",
        msg:"등록 성공"
      }))
      router.replace("/")
    }
    if(state === "failure"){
      dispatch(snackActions.setSnack({
        severity:"error",
        msg:"등록 실패"
      }))
    }
  },[state])

  return [submit, state] as const

}

export default usePostWrite