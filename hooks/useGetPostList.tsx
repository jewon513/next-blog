import {useEffect, useState} from "react";
import {PostListResult} from "../query/post";
import useSWR from 'swr'
import {fetcher} from "../lib/utils";

const useGetPostList = (pageNo, pagePerCnt)=>{

  const [lastPageNo, setLastPageNo] = useState(0)
  const {data, error} = useSWR<PostListResult>(`/api/post?pageNo=${pageNo}&pagePerCnt=${pagePerCnt}`, fetcher, {revalidateOnFocus: false})

  const getLastPageNo = (pagePerCnt, cnt)=>{
    return Math.ceil(cnt/pagePerCnt)
  }

  useEffect(()=>{
    if(data?.cnt){
      setLastPageNo(getLastPageNo(pagePerCnt, data.cnt))
    }
  },[data, error])

  return [data?.list, lastPageNo] as const
}

export default useGetPostList