import {ChangeEvent, ChangeEventHandler, useState} from "react";
import {set} from "immer/dist/utils/common";

const useInput = (defaultValue:any)=>{

  const [state, setState] = useState(defaultValue)
  const onChange:ChangeEventHandler<HTMLTextAreaElement> = (e):void=>{
    setState(e.target.value)
  }

  return [state, setState, onChange] as const
}

export default useInput