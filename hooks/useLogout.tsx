import {useDispatch} from "react-redux";
import axios from "axios";
import {userAction} from "../store/modules/user";
import {snackActions} from "../store/modules/snack";

const useLogout = ()=>{
  const dispatch = useDispatch();

  const logout = async ()=>{
    await axios.post("/api/logout")
    dispatch(userAction.logout())
    dispatch(snackActions.setSnack({
      msg:"Logout Success",
      severity:"success"
    }))
  }

  return logout
}

export default useLogout