import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";

const PostViewHeader = ({postTitle, postInsDate}) => {

  return (
    <>
      <Box py={"50px"}>
        <Typography variant={"h3"} align={"center"}>
          {postTitle}
        </Typography>
        <Typography variant={"subtitle2"} align={"center"} color={"gray"}>
          {dayjs(postInsDate).format("YYYY-MM-DD")}
        </Typography>
      </Box>
    </>
  )
}

export default PostViewHeader