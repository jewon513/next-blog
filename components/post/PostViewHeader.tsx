import {Box, IconButton, Typography} from "@mui/material";
import dayjs from "dayjs";
import {Viewer} from "@toast-ui/react-editor";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import axios from "axios";

const PostViewHeader = ({postTitle, postInsDate}) => {

  const router = useRouter()
  const userData = useSelector(state => state.user.userData)
  const isAdmin = userData.user_role === "admin"

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
      {isAdmin &&
			<Box display={"flex"} justifyContent={"right"}>
				<IconButton onClick={async () => {
          await router.push({pathname: "/write/[postNo]", query: {...router.query}})
        }}>
					<CreateIcon/>
				</IconButton>
				<IconButton onClick={async () => {
          const result = await axios.delete(`/api/post?postNo=${router.query.postNo}`)
          await router.replace("/")
        }}>
					<DeleteIcon/>
				</IconButton>
			</Box>
      }
    </>
  )
}

export default PostViewHeader