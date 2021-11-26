import {ChangeEvent, ChangeEventHandler, useState} from "react";

const useInput = (defaultValue:any)=>{

  const [state, setState] = useState(defaultValue)
  const onChange:ChangeEventHandler<HTMLTextAreaElement> = (e):void=>{
    setState(e.target.value)
  }

  return [state, onChange] as const
}

export default useInput