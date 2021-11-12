import {Grid} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const LoadingCircular = ()=>{
  return (
    <Grid container={true} alignItems={"center"} justifyContent={"center"} sx={{
      height:"100vh",
      width:"100%"
    }}>
      <Grid item={true}>
        <CircularProgress/>
      </Grid>
    </Grid>
  )
}

export default LoadingCircular