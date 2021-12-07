import {useEffect, useState} from "react";
import {ApiState} from "../lib/types";
import axios from "axios";
import {PostListResult, PostResult} from "../query/post";
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const useGetPostList = (pagePerCnt)=>{

  const [pageNo, setPageNo] = useState(1)
  const [lastPageNo, setLastPageNo] = useState(0)
  const {data, error} = useSWR<PostListResult>(`/api/post?pageNo=${pageNo}&pagePerCnt=${pagePerCnt}`, fetcher)

  const getLastPageNo = (pagePerCnt, cnt)=>{
    return Math.ceil(cnt/pagePerCnt)
  }

  useEffect(()=>{
    if(data?.cnt){
      setLastPageNo(getLastPageNo(pagePerCnt, data.cnt))
    }
  },[data, error])

  return [data?.list, lastPageNo, setPageNo] as const
}

export default useGetPostList