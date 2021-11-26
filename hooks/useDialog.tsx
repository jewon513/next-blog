import {useState} from "react";

const useDialog = ()=>{

  const [state, setState] = useState(false)

  const handleClickOpen = () => {
    setState(true);
  };

  const handleClose = () => {
    setState(false);
  };

  return [state, handleClickOpen, handleClose] as const
}

export default useDialog