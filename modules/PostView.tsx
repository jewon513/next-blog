import Layout from "../components/Layout";
import PostViewHeader from "../components/post/PostViewHeader";
import {Box} from "@mui/material";

const PostView = ({post})=> {

  return (
    <Layout>
			<>
				<PostViewHeader postTitle={post.post_title} postInsDate={post.post_ins_date}/>
				<Box className={"editor__content"} dangerouslySetInnerHTML={{__html: post.post_contents as string}}/>
			</>
    </Layout>
  )
}

export default PostView