import {Box} from "@mui/material";
import {ReactNode} from "react";
import useMainHeight from "../hooks/useMainHeight";

const Main = ({children}:{children:ReactNode})=>{

  const height = useMainHeight()

  return (
    <Box sx={{
      minHeight:`calc(100vh - ${height}px)`
    }}>
      {children}
    </Box>
  )
}

export default Main