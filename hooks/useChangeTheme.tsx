import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../store/modules/common";
import {useMemo} from "react";
import {createTheme} from "@mui/material";

const useChangeTheme = () => {

  const mode = useSelector(state => state.common.mode)
  const dispatch = useDispatch()

  const toggleEvent = () => {
    dispatch(commonActions.setTheme(mode === "light" ? "dark" : "light"))
  }

  const theme = useMemo(()=>{
    return createTheme({
      palette: {
        mode: mode
      },
      typography: {
        "fontFamily": "NotoSansKR"
      }
    })
  },[mode])

  return {toggleEvent, theme}
}

export default useChangeTheme