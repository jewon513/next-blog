import Layout from "../components/Layout";
import useGetPost from "../hooks/useGetPost";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import {Editor, Viewer} from "@toast-ui/react-editor";
import {Box, Divider, Typography} from "@mui/material";
import dayjs from "dayjs";
import PostViewHeader from "../components/post/PostViewHeader";

const PostView = ()=>{

  const [postState, post] = useGetPost()

  return (
    <Layout>
      {postState === "loading" && <LoadingSpinner/>}
      {postState === "success" &&
        <>
          <PostViewHeader postTitle={post.post_title} postInsDate={post.post_ins_date}/>
          <Viewer initialValue={post.post_contents}/>
        </>
      }
    </Layout>
  )
}

export default PostView