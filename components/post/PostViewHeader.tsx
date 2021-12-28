import {Box, Typography} from "@mui/material";
import tz from "../../lib/dayjs";

const PostViewHeader = ({postTitle, postInsDate}) => {

  return (
    <>
      <Box paddingY={5}>
        <Typography variant={"h4"} align={"center"} sx={{
          fontWeight: "bold"
        }}>
          {postTitle}
        </Typography>
        <Typography variant={"subtitle2"} align={"center"} color={"gray"}>
          {tz(postInsDate).format("YYYY-MM-DD")}
        </Typography>
      </Box>
    </>
  )
}

export default PostViewHeader