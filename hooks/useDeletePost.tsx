import {useState} from "react";
import {ApiState} from "../lib/types";
import axios from "axios";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {snackActions} from "../store/modules/snack";

const useDeletePost = ()=>{

  const router = useRouter()
  const dispatch = useDispatch()
  const [state, setState] = useState<ApiState>("idle")

  const delPost = async ()=>{
    try{
      if(state !== "loading"){
        setState("loading")
        const result = await axios.delete(`/api/post?postNo=${router.query.postNo}`)
        setState("success")
        dispatch(snackActions.setSnack({
          severity:"success",
          msg:"삭제 성공"
        }))
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