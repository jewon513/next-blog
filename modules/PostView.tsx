import Layout from "../components/Layout";
import useGetPost from "../hooks/useGetPost";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import PostViewHeader from "../components/post/PostViewHeader";
import {Box} from "@mui/material";

const PostView = ()=> {

  const [postState, post] = useGetPost()

  return (
    <Layout>
      {postState === "loading" && <LoadingSpinner/>}
      {postState === "success" &&
			<>
				<PostViewHeader postTitle={post.post_title} postInsDate={post.post_ins_date}/>
				<Box className={"editor__content"} dangerouslySetInnerHTML={{__html: post.post_contents as string}}/>
			</>
      }
    </Layout>
  )
}

export default PostView