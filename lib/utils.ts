import axios from "axios";

export const dataConvertToJson = (sqlResult: any, list = false) => {
  let data = sqlResult
  if (!list) {
    switch (true) {
      case Array.isArray(sqlResult):
        data = sqlResult[0]
        break;
      case typeof data === "object":
        // nothing...
        break;
      default:
        data = undefined
    }
  }
  return data ? JSON.parse(JSON.stringify(data)) : undefined
}

export const fetcher = url => axios.get(url).then(res => res.data)