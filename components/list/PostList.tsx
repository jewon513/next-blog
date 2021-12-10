import {Box, Button, Fade, Grid, Grow, Typography} from "@mui/material";
import {MouseEventHandler} from "react";
import dayjs from "../../lib/dayjs";

const PostList = ({title, subTitle, date, index, onClick}:{title:string, subTitle:string, date:string, index:number, onClick:MouseEventHandler<Element>})=>{

  return (
    <Fade in={true}
          style={{
            transformOrigin: "0 0 0"
          }}
          timeout={(1+index)*500}
    >
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
            }} onClick={onClick}>
              Read more ...
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )

}

export default PostList