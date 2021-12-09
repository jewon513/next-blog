import axios from "axios";

export const dataConvertToJson = (sqlResult:any, list=false)=>{
  let data = sqlResult
  if(!list){
    data = Array.isArray(sqlResult) ? sqlResult[0] : undefined
  }
  return data ? JSON.parse(JSON.stringify(data)) : undefined
}

export const fetcher = url => axios.get(url).then(res => res.data)