import {useEffect, useState} from "react";
import {ApiState} from "../lib/types";
import axios from "axios";
import {PostResult} from "../query/post";
import {useRouter} from "next/router";

const useGetPost = ()=>{

  const router = useRouter()
  const [state, setState] = useState<ApiState>("idle")
  const [post, setPost] = useState<PostResult>({
    post_no: 0,
    post_ins_date:"",
    post_contents:"",
    post_subtitle:"",
    post_title:"",
    post_user_no:0
  })

  const getPost = async (postNo)=>{
    try{
      if(state !== "loading"){
        setState("loading")
        const res = await axios.get<PostResult>(`/api/post?postNo=${postNo}`)
        setPost(res.data)
        setState("success")
        console.log(res)
      }
    }catch (e){
      console.error(e)
      setState("failure")
    }
  }

  useEffect(()=>{
    const postNo = router.query?.postNo
    if(postNo){
      getPost(postNo)
    }else{
      setState("failure")
    }
  },[])

  return [state, post] as const
}

export default useGetPost