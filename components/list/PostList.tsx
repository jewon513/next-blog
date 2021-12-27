import {Box, Chip, Fade, Grid, Grow, Typography} from "@mui/material";
import {MouseEventHandler} from "react";
import tz from "../../lib/dayjs";

const PostList = ({title, subTitle, date, index, tags, onClick}:{title:string, subTitle:string, date:string, index:number, tags:string, onClick:MouseEventHandler<Element>})=>{

  return (
    <Fade in={true}
          style={{
            transformOrigin: "0 0 0"
          }}
          timeout={(1+index)*500}
    >
      <Box sx={{
        borderTop:1,
        paddingY:4,
        borderColor:"gray"
      }}>
        <Grid container={true}>
          <Grid item={true} xs={12}>
            <Typography variant={"subtitle2"} color={"gray"}>
              {tz(date).format("YYYY-MM-DD")}
            </Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <Typography variant={"h5"} fontWeight={"bold"}>
              {title}
            </Typography>
          </Grid>
          <Grid item={true} xs={12} paddingY={2}>
            <Typography variant={"subtitle1"} color={"gray"}>
              {subTitle}
            </Typography>
          </Grid>
          {tags &&
            <Grid item={true} xs={12}>
              {tags.split(",").map((tag, index) => {
                return (
                  <Chip
                    key={index}
                    sx={{
                      marginRight: "4px",
                      marginBottom: "4px"
                    }}
                    label={tag}
                    size={"small"}
                    variant={"outlined"}
                    clickable={true}
                  />
                )
              })}
            </Grid>
          }
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