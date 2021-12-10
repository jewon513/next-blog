import {Box, Typography} from "@mui/material";
import useMainHeight from "../../hooks/useMainHeight";

const EmptyPost = ()=>{
  const height = useMainHeight()
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"} sx={{
      minHeight:`calc(100vh - ${height}px)`
    }}>
      <Typography variant={"h5"} textAlign={"center"} sx={{
        fontWeight:"bold"
      }}>
        포스트가 존재하지 않습니다.
      </Typography>
    </Box>
  )
}

export default EmptyPost