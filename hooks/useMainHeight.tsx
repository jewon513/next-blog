import {useEffect, useState} from "react";

const useMainHeight = ()=>{

  const [height, setHeight] = useState(0);

  useEffect(()=>{
    const header = document.getElementById("headerWrapper")
    const footer = document.getElementById("footerWrapper")

    const headerHeight = header ? header.clientHeight : 0
    const footerHeight = footer ? footer.clientHeight : 0

    setHeight(headerHeight + footerHeight)
  },[])

  return height
}

export default useMainHeight