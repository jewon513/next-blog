import {useRouter} from "next/router";

const useGoMain = ()=>{
  const router = useRouter()
  const goMain = ()=>{
    router.push({pathname:"/"})
  }
  return goMain
}

export default useGoMain