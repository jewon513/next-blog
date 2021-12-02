import {Box, Button, Grid, Typography} from "@mui/material";
import dayjs from "dayjs"

const PostList = ({title, subTitle, date}:{title:string, subTitle:string, date:string})=>{

  return (
    <Box sx={{
      borderTop:1,
      paddingY:5,
      borderColor:"gray"
    }}>
      <Grid container={true}>
        <Grid item={true} xs={12}>
          <Typography variant={"subtitle2"} color={"gray"}>
            {dayjs(date).format("YYYY-MM-DD")}
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Typography variant={"h5"} fontWeight={"bold"}>
            {title}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} paddingY={3}>
          <Typography variant={"subtitle1"} color={"gray"}>
            {subTitle}
          </Typography>
        </Grid>
        <Grid item={true} xs={12}>
          <Typography component={"a"} variant={"subtitle1"} color={"primary"} sx={{
            cursor:"pointer"
          }}>
            Read more ...
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )

}

export default PostList