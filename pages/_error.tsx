import React, {useEffect} from "react";
import ErrorContent from "../components/loading/ErrorContent";

const Error = (props)=>{

  useEffect(()=>{
    console.log(props)
  },[])

  return (
    <ErrorContent text={"페이지를 찾을 수 없습니다."}/>
  )
}

export default Error