import {useDispatch} from "react-redux";
import axios from "axios";
import {userAction} from "../store/modules/user";

const useLogout = ()=>{
  const dispatch = useDispatch();

  const logout = async ()=>{
    await axios.post("/api/logout")
    dispatch(userAction.logout())
  }

  return logout
}

export default useLogout