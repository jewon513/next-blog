import {Box, CircularProgress} from "@mui/material";
import useMainHeight from "../../hooks/useMainHeight";

const LoadingSpinner = ()=>{
  const height = useMainHeight()
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"} sx={{
      minHeight:`calc(100vh - ${height}px)`
    }}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingSpinner