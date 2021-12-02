import {useEffect, useState} from "react";
import {ApiState} from "../lib/types";
import axios from "axios";
import {PostListResult, PostResult} from "../query/post";

const useGetPostList = (pagePerCnt)=>{

  const [state, setState] = useState<ApiState>("idle")
  const [pageNo, setPageNo] = useState(1)
  const [list, setList] = useState<Array<PostResult>>([])
  const [lastPageNo, setLastPageNo] = useState(0)

  const getLastPageNo = (pagePerCnt, cnt)=>{
    return Math.ceil(cnt/pagePerCnt)
  }

  const getList = async()=>{
    try{
      if(state !== "loading"){
        setState("loading")
        const res = await axios.get<PostListResult>(`/api/post?pageNo=${pageNo}&pagePerCnt=${pagePerCnt}`)
        setList(res.data.list)
        setLastPageNo(getLastPageNo(pagePerCnt,res.data.cnt))
        setState("success")
      }
    }catch (e){
      setState("failure")
      console.error(e)
    }
  }

  useEffect(()=>{
    getList()
  },[pageNo])

  return [state, lastPageNo, list, setPageNo] as const
}

export default useGetPostList