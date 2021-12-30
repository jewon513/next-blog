import {Box, Typography} from "@mui/material";
import useMainHeight from "../../hooks/useMainHeight";

const ErrorContent = ({text})=>{
  const height = useMainHeight()
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"} sx={{
      minHeight:`calc(100vh - ${height}px)`
    }}>
      <Typography variant={"h5"} textAlign={"center"} sx={{
        fontWeight:"bold"
      }}>
        {text}
      </Typography>
    </Box>
  )
}

export default ErrorContent