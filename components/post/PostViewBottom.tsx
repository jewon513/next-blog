import {Box} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import useDeletePost from "../../hooks/useDeletePost";

const PostViewBottom = ()=>{

  const router = useRouter()
  const userData = useSelector(state => state.user.userData)
  const [delPost, delPostState] = useDeletePost()
  const isAdmin = userData.user_role === "admin"
  const moveEditPage = async () => {
    await router.push({pathname: "/write/[postNo]", query: {...router.query}})
  }
  return (
    <>
      {isAdmin &&
			<Box display={"flex"}
					 justifyContent={"right"}
					 sx={{
             marginTop:"30px"
           }}
			>
				<LoadingButton
					onClick={moveEditPage}
					loading={false}
					loadingPosition="start"
					startIcon={<CreateIcon />}
					variant="outlined"
					sx={{
            marginRight: "8px"
          }}
				>
					Edit
				</LoadingButton>
				<LoadingButton
					color={"warning"}
					onClick={delPost}
					loading={delPostState === "loading"}
					loadingPosition={"start"}
					startIcon={<DeleteIcon/>}
					variant={"outlined"}
				>
					DELETE
				</LoadingButton>
			</Box>
      }
    </>
  )
}

export default PostViewBottom